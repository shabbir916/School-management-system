// pages/addSchool.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage("School added successfully!");
        reset();
        setTimeout(() => {
          router.push("/showSchools");
        }, 2000);
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      setMessage("Error submitting form");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add School - School Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div className="form-wrapper">
          <h1>Add New School</h1>

          {message && (
            <div
              className={`message ${
                message.includes("Error") ? "error" : "success"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">School Name *</label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "School name is required",
                  minLength: {
                    value: 3,
                    message: "School name must be at least 3 characters",
                  },
                })}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                rows="3"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters",
                  },
                })}
                className={errors.address ? "error" : ""}
              />
              {errors.address && (
                <span className="error-message">{errors.address.message}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  {...register("city", {
                    required: "City is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "City must contain only letters",
                    },
                  })}
                  className={errors.city ? "error" : ""}
                />
                {errors.city && (
                  <span className="error-message">{errors.city.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  {...register("state", {
                    required: "State is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "State must contain only letters",
                    },
                  })}
                  className={errors.state ? "error" : ""}
                />
                {errors.state && (
                  <span className="error-message">{errors.state.message}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number *</label>
              <input
                type="tel"
                id="contact"
                {...register("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                className={errors.contact ? "error" : ""}
              />
              {errors.contact && (
                <span className="error-message">{errors.contact.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email_id">Email Address *</label>
              <input
                type="email"
                id="email_id"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className={errors.email_id ? "error" : ""}
              />
              {errors.email_id && (
                <span className="error-message">{errors.email_id.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="image">School Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", {
                  validate: {
                    fileSize: (files) => {
                      if (!files || !files[0]) return true;
                      return (
                        files[0].size <= 5242880 ||
                        "File size must be less than 5MB"
                      );
                    },
                    fileType: (files) => {
                      if (!files || !files[0]) return true;
                      const acceptedFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                      ];
                      return (
                        acceptedFormats.includes(files[0].type) ||
                        "Please upload a valid image file"
                      );
                    },
                  },
                })}
                className={errors.image ? "error" : ""}
              />
              {errors.image && (
                <span className="error-message">{errors.image.message}</span>
              )}
            </div>

            <div className="button-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Adding School..." : "Add School"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/showSchools")}
                className="view-btn"
              >
                View Schools
              </button>
            </div>
          </form>
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

          .form-wrapper {
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(14px);
            border-radius: 20px;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
            padding: 50px 40px;
            width: 100%;
            max-width: 600px;

            transition: all 0.3s ease-in-out;
          }

          .form-wrapper:hover {
            border-color: rgba(16, 185, 129, 0.5);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.45);
          }

          h1 {
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
            text-align: center;
            font-size: 2rem;
          }

          .message {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
          }

          .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }

          .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 500;
            font-size: 1.15rem;
          }

          input,
          textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: transparent;
            color: white;
          }

          input:hover,
          textarea:hover {
            border-color: rgba(16, 185, 129, 0.5);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.45);
          }

          input.error,
          textarea.error {
            border-color: #dc3545;
          }

          .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
            display: block;
          }

          .button-group {
            display: flex;
            gap: 15px;
            margin-top: 30px;
          }

          .submit-btn,
          .view-btn {
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

          .submit-btn:hover,
          .view-btn:hover {
            background: rgba(16, 185, 129, 0.25);
            border-color: #10b981;
            box-shadow: 0 0 18px rgba(16, 185, 129, 0.5);
            background: linear-gradient(to top left, #64b3f4, #c2e59c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          @media (max-width: 768px) {
            .form-wrapper {
              padding: 25px;
            }

            h1 {
              font-size: 1.5rem;
            }

            .form-row {
              grid-template-columns: 1fr;
              gap: 10px;
            }

            .button-group {
              flex-direction: column;
            }
            input,
            textarea {
              width: 95%;
            }
          }
        `}</style>
      </div>
    </>
  );
}
