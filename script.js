document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");
    const totalText = document.querySelector(".total-text b");
  
    // Define the prices for each box
    const prices = {
      topBox: {
        regularPrice: 24.00,
        discountedPrice: 10.00
      },
      middleBox: {
        regularPrice: 24.00,
        discountedPrice: 18.00
      },
      bottomBox: {
        regularPrice: 24.00,
        discountedPrice: 24.00
      }
    };
  
    // Function to update the total price based on the selected box
    function updateTotalPrice() {
      let selectedBox = document.querySelector(".box.selected");
      if (selectedBox) {
        const boxId = selectedBox.id;
        const boxPrice = prices[boxId];
  
        // Update the total price text
        if (boxPrice) {
          totalText.textContent = `$${boxPrice.discountedPrice.toFixed(2)} USD`;
        }
      }
    }
  
    // Set the default selected box to be middleBox
    boxes[1].classList.add('selected');
    boxes[1].querySelector('.radio-button').checked = true;
    updateTotalPrice(); // Update the price initially based on the default selection
  
    boxes.forEach(box => {
      box.addEventListener("click", function () {
        const radioButton = this.querySelector('.radio-button');
  
        // Uncheck non-selected boxes
        const radioButtons = document.querySelectorAll('input[name="pairSelection"]');
        radioButtons.forEach(radio => {
          if (radio !== radioButton) {
            radio.checked = false;
          }
        });
  
        // Go to default state
        const selectedBox = document.querySelector('.selected');
        if (selectedBox && selectedBox !== this) {
          selectedBox.classList.remove('selected');
        }
  
        // Add the selected class and toggle checked state
        this.classList.add('selected');
        radioButton.checked = !radioButton.checked;
  
        // Automatically show or hide content-section based on selection
        const contentSection = this.querySelector('.content-section');
        if (contentSection) {
          contentSection.style.display = radioButton.checked ? 'block' : 'none';
        }
  
        // Update the total price when the selection changes
        updateTotalPrice();
      });
  
      box.addEventListener("mouseenter", function () {
        if (!this.classList.contains('selected')) {
          this.classList.add('hover');
        }
      });
  
      box.addEventListener("mouseleave", function () {
        this.classList.remove('hover');
      });
  
      // Prevent triggering box click when interacting with dropdown
      const dropdowns = box.querySelectorAll('.dropdown select');
      dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", function (event) {
          event.stopPropagation();  // Prevent the click event from bubbling up
        });
      });
    });
  });
  