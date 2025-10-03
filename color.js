
    // Grab all buttons
    const buttons = document.querySelectorAll('.buttons button');

    // Attach click event to each button
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        document.body.style.backgroundColor = color;
      });
    });
 