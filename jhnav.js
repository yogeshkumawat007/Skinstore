// Function to load and display the content of nav.html
function loadNavContent() {
  const container = document.getElementById('nav-container');
  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      container.innerHTML = xhr.responseText;
    }
  };
  
  xhr.open('GET', 'nav.html', true);
  xhr.send();
}
//Fucntion all

// Call the function to load and display the nav.html content
loadNavContent();
