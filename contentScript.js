// contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'autofill') {
        autofillForm();
    }
});

function autofillForm() {
    console.log('autofillForm');

    // Get all the input elements in the document which is not hidden
    var inputElements = document.querySelectorAll('input:not([type="hidden"])');
    console.log(inputElements.length);

    // Get all the input elements in the document which is hidden
    var hiddenInputElements = document.querySelectorAll('input[type="hidden"]');
    console.log(hiddenInputElements.length);

    // Create an object to store the form data
    var formData = {
        'Name': 'John Doe',
        'Email': 'abc@gmail.com',
        'Phone': '1234567890',
        'SRN': '1234567890',
    };


    // Iterate over each input element
    inputElements.forEach(function (inputElement, index) {

        if (inputElement.type === 'email') {
            inputElement.value = formData.Email;
            inputElement.setAttribute('data-initial-value', formData.Email);
            inputElement.setAttribute('badinput', false);
            inputElement.nextElementSibling.style.display = 'none';

            // Set the value of the hidden input element whose name is 'emailAddress'
            // var hiddenInputElement = document.querySelector('input[name="emailAddress"]');
            // hiddenInputElement.value = formData.Email;
            // remove this from the hiddeninputelement array
        } else {

            // Using aria-labelledby get the id of the label and then get the label text
            var labelId = inputElement.getAttribute('aria-labelledby');
            var labelElement = document.getElementById(labelId);
            var labelValue = labelElement ? labelElement.textContent.trim().replace('*', '') : '';

            console.log('Field: ' + inputElement.name + ', Label: ' + labelValue);

            let value = formData[labelValue.trim()]

            // If the label text is present in the form data object, then set the value of the input element
            // if (labelValue && formData[labelValue]) {
            // console.log('Field: ' + inputElement.name + ', Label: ' + labelValue + ', Value: ' + formData[labelValue]);
            inputElement.value = value;
            inputElement.setAttribute('data-initial-value', value);
            inputElement.setAttribute('badinput', false);
            inputElement.nextElementSibling.style.display = 'none';
            // hiddenInputElement[index].value = formData[labelValue];
            // }
            // try {
            //     hiddenInputElements[index - 1].value = value;
            // } catch (error) {
            //     console.log(error);
            // }

            // Make a keyboard input and add a space and remove it
            inputElement.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }));
        }
    });

    // Iterate over each hidden input element
    hiddenInputElements.forEach(function (hiddenInputElement) {
        console.log(hiddenInputElement.name);
    });

}

