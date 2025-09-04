// pages/index.js
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>School Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div className="form-wrapper">
          <h1>School Management System</h1>
          <p className="tagline">Manage your school directory with ease</p>

          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => router.push("/addSchool")}
            >
              Add New School
            </button>
            <button
              className="secondary-btn"
              onClick={() => router.push("/showSchools")}
            >
              View All Schools
            </button>
          </div>
        </div>

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

            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* Glassmorphism wrapper */
          .form-wrapper {
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(14px);
            border-radius: 20px;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
            padding: 50px 40px;
            width: 100%;
            max-width: 600px;
            color: #fff;
            text-align: center;
            transition: all 0.3s ease-in-out;
          }

          .form-wrapper:hover {
            border-color: rgba(16, 185, 129, 0.5);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.45);
          }

          h1 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            background: linear-gradient(to top left, #c2e59c, #64b3f4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .tagline {
            font-size: 1.4rem;
            margin-bottom: 30px;
            background: linear-gradient(to top left, #c2e59c, #64b3f4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
          }

          .primary-btn,
          .secondary-btn {
            flex: 1;
            padding: 14px 28px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            color: white;
          }

          .primary-btn:hover,
          .secondary-btn:hover {
            background: rgba(16, 185, 129, 0.25);
            border-color: #10b981;
            box-shadow: 0 0 18px rgba(16, 185, 129, 0.5);
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          @media (max-width: 768px) {
            .form-wrapper {
              padding: 30px 20px;
            }

            h1 {
              font-size: 2rem;
            }

            .tagline {
              font-size: 1rem;
            }

            .buttons {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </>
  );
}
