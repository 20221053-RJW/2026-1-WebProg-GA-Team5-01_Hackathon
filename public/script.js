document.getElementById('feedbackForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const content = document.getElementById('content').value;
    console.log('Content submitted:', content);
}