
new Vue({
  el: '#app',
  data: {
    url:"https://darferreira.pythonanywhere.com",
    datos: []
  },
  mounted() {
    // Realizar la solicitud a la API usando fetch (llamada a method)
    this.fetchData();

  // Agregar un listener al botón btnSearch para realizar la búsqueda
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
      btnSearch.addEventListener('click', this.searchData);
  }


  },
  methods: {
    agregarAlCarrito(dato) {
      // Lógica para agregar al carrito
      console.log('Agregado al carrito:', dato);
    },
    borrar(dato) {
      const confirmacion = confirm(`¿Estás seguro que deseas borrar este producto?`);

      if (confirmacion) {
        // Llamada a la API para eliminar el product
        fetch(`${this.url}/api/productos/${dato}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al borrar el producto');
            }
            response.text()
          })
          .then(res => {
            location.reload();
          })
          .catch(error => console.error('Error al borrar el producto:', error));
      }
    },

    fetchData() {
      // Realizar la solicitud a la API usando fetch
      fetch(`${this.url}/api/productos`)
        .then(response => response.json())
        .then(data => {
          // Asignar los datos obtenidos a la propiedad datos
          this.datos = data;
        })
        .catch(error => console.error('Error recuperando data:', error));
    },

    searchData() {
      // Obtener el contenido del componente con id="searchBox"
      const searchBoxContent = document.getElementById('searchBox').value;
  
      // Verificar si hay contenido 
      if (searchBoxContent.trim() !== '') {
        // Realizar la solicitud a la nueva API con el contenido del cuadro de búsqueda como parámetro
        fetch(`${this.url}/api/searchProductos/${searchBoxContent}`)
          .then(response => response.json())
          .then(data => {
            // Asignar los datos obtenidos a la propiedad datos
            this.datos = data;
          })
          .catch(error => console.error('Error fetching data:', error));
      } else {
        // Si no hay contenido en el cuadro de búsqueda, seguir con la API original
        this.fetchData();
      }
    },

  
  beforeDestroy() {
    // Quitar el listener del btn btnSearch antes de destruir el componente
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
      btnSearch.removeEventListener('click', this.searchData);
    }
  }
}
  
});


