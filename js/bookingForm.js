const bookingForm = document.getElementById('booking-form');
const formResponseDiv = document.getElementById('form-response');
const submitBtn = document.getElementById('submit-btn');
const spinner = document.getElementById('loading-spinner');

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  spinner.style.display = 'inline-block';
  submitBtn.disabled = true;

  //getting reCAPTCHA
  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    formResponseDiv.textContent = 'Please complete the CAPTCHA';
    formResponseDiv.style.display = 'block';
    spinner.style.display = 'none';
    submitBtn.disabled = false;
    return;
  }

  const formData = new FormData(bookingForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  formDataObject["g-recaptcha-response"] = recaptchaToken;

  try {
    const response = await fetch(bookingForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    });

    const data = await response.json();

    if (response.ok) {
      formResponseDiv.textContent = data.message;
      formResponseDiv.style.display = 'block';
      bookingForm.reset(); // Clear the form
    } else {
      formResponseDiv.textContent = data.error || 'An error occurred. Please try again.';
      formResponseDiv.style.display = 'block';
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    formResponseDiv.textContent = 'Failed to submit booking request. Please check your connection.';
    formResponseDiv.style.display = 'block';
  }
  spinner.style.display = 'none';
  submitBtn.disabled = false;
});