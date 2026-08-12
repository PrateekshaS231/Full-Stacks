import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [campus, setCampus] = useState("");
  const [programme, setProgramme] = useState("");
  const [course, setCourse] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Captcha displayed on screen
  const captchaCode = "8e608a";

  // NAME
  // Only letters and spaces are allowed.
  // Automatically converts everything to uppercase.
  const handleNameChange = (e) => {
    const value = e.target.value
      .replace(/[^a-zA-Z\s]/g, "")
      .toUpperCase();

    setName(value);
  };

  // EMAIL
  // Automatically converts email to lowercase.
  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();

    setEmail(value);

    if (
      value.length > 0 &&
      !value.endsWith("@gmail.com") &&
      !value.endsWith("@yahoo.com")
    ) {
      setEmailError(
        "Email must end with @gmail.com or @yahoo.com"
      );
    } else {
      setEmailError("");
    }
  };

  // MOBILE NUMBER
  // Numbers only, maximum 10 digits.
  const handleNumberChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setNumber(value);
  };

  // OTP
  // Numbers only, maximum 6 digits.
  const handleOtpChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
  };

  // CAPTCHA
  // Letters and numbers only.
  const handleCaptchaChange = (e) => {
    const value = e.target.value
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 6);

    setCaptcha(value);

    // Remove error when captcha becomes correct
    if (
      value.toLowerCase() ===
      captchaCode.toLowerCase()
    ) {
      setCaptchaError("");
    }
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // Name validation
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    // Email validation
    const validEmail =
      email.endsWith("@gmail.com") ||
      email.endsWith("@yahoo.com");

    if (!validEmail) {
      setEmailError(
        "Please use a Gmail or Yahoo email address."
      );
      return;
    }

    // Mobile validation
    if (number.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // OTP validation
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    // Dropdown validation
    if (
      !state ||
      !city ||
      !campus ||
      !programme ||
      !course
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Captcha validation
    if (
      captcha.toLowerCase() !==
      captchaCode.toLowerCase()
    ) {
      setCaptchaError(
        "Captcha does not match. Please try again."
      );
      return;
    }

    // Checkbox validation
    if (!agreed) {
      alert("Please agree to the terms.");
      return;
    }

    // Everything is valid
    setCaptchaError("");
    setSubmitted(true);
  };

  return (
    <div className="page">

      <div className="form-card">

        <div className="blob blob-one"></div>
        <div className="blob blob-two"></div>

        <div className="content">

          <div className="top-icon">
            🎓
          </div>

          <h1>
            Applications Open 2026
          </h1>

          <p className="subtitle">
            Fill in your details to get started ✨
          </p>


          {submitted ? (

            /* =========================
               SUCCESS SCREEN
            ========================= */

            <div className="success">

              <div className="success-emoji">
                🎉
              </div>

              <h2>
                Application Submitted!
              </h2>

              <p>
                Thank you, {name}!
                <br />
                Your application has been
                submitted successfully.
              </p>

              <button
                className="again-button"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setNumber("");
                  setOtp("");
                  setState("");
                  setCity("");
                  setCampus("");
                  setProgramme("");
                  setCourse("");
                  setCaptcha("");
                  setAgreed(false);
                  setCaptchaError("");
                  setEmailError("");
                }}
              >
                Apply Again
              </button>

            </div>

          ) : (

            /* =========================
               FORM
            ========================= */

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="field">

                <label>
                  Name *
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="field">

                <label>
                  Email Address *
                </label>

                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />

                {emailError && (
                  <p className="error-message">
                    {emailError}
                  </p>
                )}

              </div>


              {/* MOBILE NUMBER */}

              <div className="field">

                <label>
                  Mobile Number *
                </label>

                <input
                  type="text"
                  placeholder="Enter 10-digit mobile number"
                  value={number}
                  onChange={handleNumberChange}
                  maxLength="10"
                  inputMode="numeric"
                  required
                />

              </div>


              {/* OTP */}

              <div className="field">

                <label>
                  OTP *
                </label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength="6"
                  inputMode="numeric"
                  required
                />

              </div>


              {/* STATE + CITY */}

              <div className="double-row">

                <div className="field">

                  <label>
                    State *
                  </label>

                  <select
                    value={state}
                    onChange={(e) =>
                      setState(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select State
                    </option>

                    <option value="Karnataka">
                      Karnataka
                    </option>

                    <option value="Tamil Nadu">
                      Tamil Nadu
                    </option>

                    <option value="Kerala">
                      Kerala
                    </option>

                    <option value="Maharashtra">
                      Maharashtra
                    </option>

                    <option value="Telangana">
                      Telangana
                    </option>

                    <option value="Andhra Pradesh">
                      Andhra Pradesh
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="field">

                  <label>
                    City *
                  </label>

                  <select
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select City
                    </option>

                    <option value="Bengaluru">
                      Bengaluru
                    </option>

                    <option value="Mysuru">
                      Mysuru
                    </option>

                    <option value="Chennai">
                      Chennai
                    </option>

                    <option value="Hyderabad">
                      Hyderabad
                    </option>

                    <option value="Mumbai">
                      Mumbai
                    </option>

                    <option value="Pune">
                      Pune
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* CAMPUS + PROGRAMME */}

              <div className="double-row">

                <div className="field">

                  <label>
                    Campus *
                  </label>

                  <select
                    value={campus}
                    onChange={(e) =>
                      setCampus(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select Campus
                    </option>

                    <option value="Main Campus">
                      Main Campus
                    </option>

                    <option value="City Campus">
                      City Campus
                    </option>

                  </select>

                </div>


                <div className="field">

                  <label>
                    Programme *
                  </label>

                  <select
                    value={programme}
                    onChange={(e) =>
                      setProgramme(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select Programme
                    </option>

                    <option value="Undergraduate">
                      Undergraduate
                    </option>

                    <option value="Postgraduate">
                      Postgraduate
                    </option>

                  </select>

                </div>

              </div>


              {/* COURSE */}

              <div className="field">

                <label>
                  Course *
                </label>

                <select
                  value={course}
                  onChange={(e) =>
                    setCourse(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select Course
                  </option>

                  <option value="Computer Science">
                    Computer Science
                  </option>

                  <option value="Business">
                    Business
                  </option>

                  <option value="Design">
                    Design
                  </option>

                  <option value="Arts">
                    Arts
                  </option>

                  <option value="Commerce">
                    Commerce
                  </option>

                </select>

              </div>


              {/* CAPTCHA */}

              <div className="captcha-row">

                <div className="captcha-box">

                  <span>
                    {captchaCode}
                  </span>

                  <button
                    type="button"
                    className="refresh-captcha"
                    onClick={() => {
                      setCaptcha("");
                      setCaptchaError("");
                    }}
                  >
                    ↻
                  </button>

                </div>


                <input
                  type="text"
                  placeholder="Enter Captcha"
                  value={captcha}
                  onChange={handleCaptchaChange}
                  required
                />

              </div>


              {/* CAPTCHA ERROR */}

              {captchaError && (
                <p className="error-message captcha-error">
                  {captchaError}
                </p>
              )}


              {/* AGREEMENT */}

              <label className="check-row">

                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) =>
                    setAgreed(e.target.checked)
                  }
                  required
                />

                <span>
                  I agree to receive information
                  regarding my submitted application.
                </span>

              </label>


              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="submit-button"
              >
                APPLY NOW ✨
              </button>


              {/* LINKS */}

              <div className="form-links">

                <p>
                  Already have an Account? Login
                </p>

                <p>
                  Resend Verification Email
                </p>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;