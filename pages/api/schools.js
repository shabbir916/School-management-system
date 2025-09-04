// pages/api/schools.js
import pool from '../../lib/db';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'schoolImages'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    try {
      const [fields, files] = await form.parse(req);
      
      // Get the uploaded file path
      let imagePath = '';
      if (files.image && files.image[0]) {
        const file = files.image[0];
        const fileName = path.basename(file.filepath);
        imagePath = `/schoolImages/${fileName}`;
      }

      // Insert into database
      const connection = await pool.getConnection();
      try {
        const [result] = await connection.execute(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            fields.name[0],
            fields.address[0],
            fields.city[0],
            fields.state[0],
            fields.contact[0],
            imagePath,
            fields.email_id[0]
          ]
        );
        
        res.status(201).json({ 
          success: true, 
          message: 'School added successfully',
          id: result.insertId 
        });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to add school' 
      });
    }
  } else if (req.method === 'GET') {
    try {
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.execute(
          'SELECT id, name, address, city, image FROM schools ORDER BY id DESC'
        );
        res.status(200).json({ success: true, schools: rows });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch schools' 
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}