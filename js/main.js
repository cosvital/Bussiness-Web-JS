// Función principal para cargar secciones de contenido
async function loadSections() {
  // Definimos un array de objetos, cada objeto representa una sección de la página con un id y una URL
  const sections = [
    { id: "our_services", url: "our_services.html" },
    { id: "portfolio", url: "portfolio.html" },
    { id: "location", url: "location.html" },
    { id: "email_us", url: "email_us.html" },
  ];

  // Usamos un bucle for para iterar sobre cada sección
  for (const section of sections) {
    try {
      // Intentamos hacer una solicitud fetch para obtener el contenido de la URL
      const response = await fetch(section.url);
      // Convertimos la respuesta en texto
      const content = await response.text();
      // Insertamos el contenido obtenido en el elemento correspondiente en el DOM
      document.getElementById(`${section.id}_container`).innerHTML = content;
    } catch (error) {
      // Si ocurre un error, lo capturamos y mostramos en la consola
      console.error(`Failed to load ${section.url}:`, error);
    }
  }

  // Inicializamos la funcionalidad del formulario
  initializeForm();

  // Inicializamos la funcionalidad de los modales
  initializeModals();
}

// Función para inicializar el formulario
function initializeForm() {
  // Obtenemos elementos del formulario y otros elementos del DOM relacionados
  const contactForm = document.getElementById("contactForm");
  const successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  const spinner = document.getElementById("spinner");
  const successMessage = document.getElementById("successMessage");

  const emailField = document.getElementById("exampleInputEmail1");
  const phoneField = document.getElementById("inputPhone");

  // Añadimos event listeners para validar los campos de email y teléfono mientras el usuario escribe
  emailField.addEventListener("input", validateEmailField);
  phoneField.addEventListener("input", validatePhoneField);

  // Añadimos un event listener para manejar la validación y el envío del formulario
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenimos el envío por defecto del formulario
    event.stopPropagation(); // Prevenimos que el evento se propague más allá

    // Validamos los campos de email y teléfono
    const emailValid = validateEmail(emailField.value);
    const phoneValid = validatePhone(phoneField.value);

    // Mostramos mensajes de error personalizados si las validaciones fallan
    if (!emailValid) {
      emailField.setCustomValidity("Invalid email format or domain.");
      emailField.reportValidity();
    } else {
      emailField.setCustomValidity("");
    }

    if (!phoneValid && phoneField.value !== "") {
      phoneField.setCustomValidity("Invalid phone number format.");
      phoneField.reportValidity();
    } else {
      phoneField.setCustomValidity("");
    }

    // Si todos los campos son válidos, mostramos un spinner y luego un mensaje de éxito
    if (
      contactForm.checkValidity() &&
      emailValid &&
      (phoneValid || phoneField.value === "")
    ) {
      spinner.style.display = "block";
      successMessage.style.display = "none";
      successModal.show();

      // Simulamos un retraso de 1 segundo para mostrar el spinner y luego el mensaje de éxito
      setTimeout(() => {
        spinner.style.display = "none";
        successMessage.style.display = "block";
        contactForm.reset();
        contactForm.classList.remove("was-validated");
      }, 1000);
    } else {
      // Si no, añadimos una clase para mostrar los errores de validación
      contactForm.classList.add("was-validated");
    }
  });

  // Función para validar el formato del email
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isGmail = email.endsWith("@gmail.com");
    return emailPattern.test(email) && !isGmail;
  }

  // Función para validar el formato del teléfono
  function validatePhone(phone) {
    const phonePattern = /^[679]\d{8}(?:\s+.*)?$/;
    return phonePattern.test(phone);
  }

  // Validamos el campo de email mientras el usuario escribe
  function validateEmailField() {
    const emailValid = validateEmail(emailField.value);
    if (emailValid) {
      emailField.setCustomValidity("");
    } else {
      emailField.setCustomValidity("Invalid email format or domain.");
    }
    emailField.reportValidity();
  }

  // Validamos el campo de teléfono mientras el usuario escribe
  function validatePhoneField() {
    const phoneValid = validatePhone(phoneField.value);
    if (phoneValid || phoneField.value === "") {
      phoneField.setCustomValidity("");
    } else {
      phoneField.setCustomValidity("Invalid phone number format.");
    }
    phoneField.reportValidity();
  }
}

// Función para inicializar los modales
function initializeModals() {
  // Definimos un array de servicios con sus detalles
  const services = [
    {
      title: "ALMACENAMIENTO EN LA NUBE SEGURO.",
      image: "/img-services/6.jpg",
      description:
        "El almacenamiento en la nube seguro es la solución perfecta para proteger y gestionar sus datos de manera eficiente y confiable. Imagine poder guardar toda su información en servidores remotos, con la tranquilidad de que está protegida por las más avanzadas medidas de seguridad. Utilizamos cifrado de datos en tránsito y en reposo, garantizando que su información esté a salvo de accesos no autorizados. Además, implementamos autenticación multifactor y políticas de acceso estrictas para añadir una capa extra de proteccion.",
    },
    {
      title: "DESARROLLO DE SOFWARE PERSONALIZADO",
      image: "/img-services/4.jpg",
      description:
        "El desarrollo de software personalizado ofrece soluciones a medida para satisfacer las necesidades específicas de su empresa. Al elegir nuestro servicio, obtiene un software diseñado exclusivamente para optimizar sus procesos, mejorar la eficiencia y proporcionar una ventaja competitiva. Trabajamos estrechamente con usted para asegurar que el producto final se alinee perfectamente con sus objetivos y requerimientos. Además, ofrecemos soporte continuo y escalabilidad, garantizando que su software evolucione junto con su negocio. Invierta en desarrollo de software personalizado y transforme la manera en que opera su empresa",
    },
    {
      title: "Service 3",
      image: "/img-services/2.jpg",
      description: "Conectividad inalámbrica avanzada.",
    },
    {
      title: "Service 4",
      image: "/img-services/1.jpg",
      description: "Soluciones globales integradas.",
    },
    {
      title: "Service 5",
      image: "/img-services/5.jpg",
      description: "Soporte de marca internacional.",
    },
    {
      title: "Service 6",
      image: "/img-services/3.jpg",
      description: "Optimización y mantenimiento técnico.",
    },
  ];

  // Obtenemos los iconos de servicios y los elementos del modal
  const serviceIcons = document.querySelectorAll(".serviceicon");
  const serviceModal = new bootstrap.Modal(
    document.getElementById("serviceModal")
  );
  const serviceModalLabel = document.getElementById("serviceModalLabel");
  const serviceImage = document.getElementById("serviceImage");
  const serviceDescription = document.getElementById("serviceDescription");

  // Añadimos event listeners a cada icono de servicio
  serviceIcons.forEach((icon) => {
    icon.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenimos el comportamiento por defecto del enlace
      const serviceIndex = this.getAttribute("data-service"); // Obtenemos el índice del servicio desde el atributo data-service
      const service = services[serviceIndex]; // Obtenemos el servicio correspondiente desde el array services

      if (service) {
        // Si encontramos el servicio, actualizamos el contenido del modal
        serviceModalLabel.textContent = service.title;
        serviceImage.src = service.image;
        serviceImage.alt = service.title;
        serviceDescription.textContent = service.description;
        serviceModal.show(); // Mostramos el modal
      } else {
        // Si no, mostramos un error en la consola
        console.error("Service not found for index:", serviceIndex);
      }
    });
  });
}

// Añadimos un event listener al evento DOMContentLoaded para cargar las secciones cuando el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", loadSections);

// Añadimos otro event listener para cargar los enlaces de la barra de navegación cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.getElementById("navbar-links");
  const links = [
    { href: "#", text: "Home" },
    { href: "#our_services_container", text: "Our Services" },
    { href: "#portfolio_container", text: "Portfolio" },
    { href: "#location_container", text: "Location" },
    { href: "#email_us_container", text: "Contact" },
  ];

  // Iteramos sobre los enlaces y los añadimos a la barra de navegación
  links.forEach((link) => {
    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.href = link.href;
    a.textContent = link.text;
    navbarLinks.appendChild(a);
  });
});
