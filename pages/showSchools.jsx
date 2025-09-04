// pages/showSchools.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch("/api/schools");
      const data = await response.json();

      if (data.success) {
        setSchools(data.schools);
      } else {
        setError("Failed to fetch schools");
      }
    } catch (err) {
      setError("Error loading schools");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Schools Directory - School Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Schools Directory</h1>
          <button
            className="add-school-btn"
            onClick={() => router.push("/addSchool")}
          >
            + Add New School
          </button>
        </header>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading schools...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchSchools}>Try Again</button>
          </div>
        )}

        {!loading && !error && schools.length === 0 && (
          <div className="empty-state">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h2>No Schools Found</h2>
            <p>Start by adding your first school</p>
            <button onClick={() => router.push("/addSchool")}>
              Add School
            </button>
          </div>
        )}

        {!loading && !error && schools.length > 0 && (
          <div className="schools-grid">
            {schools.map((school) => (
              <div key={school.id} className="school-card">
                <div className="school-image">
                  {school.image ? (
                    <img
                      src={school.image}
                      alt={school.name}
                      onError={(e) => {
                        e.target.src = "/placeholder-school.png";
                      }}
                    />
                  ) : (
                    <div className="placeholder-image">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="school-info">
                  <h3>{school.name}</h3>
                  <p className="address">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {school.address}
                  </p>
                  <p className="city">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M3 21h18" />
                      <path d="M5 21V7l8-4v18" />
                      <path d="M19 21V11l-6-4" />
                      <rect x="9" y="9" width="4" height="4" />
                      <rect x="9" y="14" width="4" height="4" />
                      <rect x="14" y="14" width="4" height="4" />
                    </svg>
                    {school.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <style jsx global>{`
          html,
          body,
          #__next {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .container {
            min-height: 100vh;
            padding: 20px;
            background: linear-gradient(
              135deg,
              #434747ff,
              #171d23ff,
              #3c4141ff
            );
          }

          .header {
            max-width: 1200px;
            margin: 0 auto 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }

          .header h1 {
            font-size: 3.2rem;
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
          }

          .add-school-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            color: white;
            // border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .add-school-btn:hover {
            background: rgba(16, 185, 129, 0.25);
            border-color: #10b981;
            box-shadow: 0 0 18px rgba(16, 185, 129, 0.5);
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .spinner {
            border: 4px solid #c2e59c;
            border-top: 4px solid #64b3f4;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .error-container {
            text-align: center;
            padding: 40px;
            color: #dc3545;
          }

          .error-container button {
            margin-top: 20px;
            padding: 10px 20px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            color: #666;
          }

          .empty-state svg {
            color: #ddd;
            margin-bottom: 20px;
          }

          .empty-state h2 {
            margin: 0 0 10px;
            color: #333;
          }

          .empty-state button {
            margin-top: 20px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .empty-state button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          }

          .schools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .school-card {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .school-card:hover {
            transform: translateY(-5px);
            border-color: rgba(16, 185, 129, 0.5);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.45);
          }

          .school-image {
            width: 100%;
            height: 200px;
            background: #f0f0f0;
            position: relative;
            overflow: hidden;
          }

          .school-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .placeholder-image {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
            color: #bbb;
          }

          .school-info {
            padding: 20px;
          }

          .school-info h3 {
            margin: 0 0 15px;
            font-size: 1.3rem;
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
          }

          .school-info p {
            margin: 8px 0;
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 14px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
            line-height: 1.5;
          }

          .school-info svg {
            flex-shrink: 0;
            margin-top: 2px;
            color: #999;
          }

          @media (max-width: 768px) {
            .header {
              text-align: center;
              justify-content: center;
            }

            .header h1 {
              font-size: 1.8rem;
              width: 100%;
            }

            .schools-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 20px;
            }
          }

          @media (max-width: 480px) {
            .schools-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
}
