<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
  </div>
  <div>
    <form>
      <div class="mb-3">
        <label for="formFile" class="form-label">Seleccione un archivo de audio</label>
        <input class="form-control" type="file" ref="audio" id="formFile" accept="audio/*">
      </div>
      <button @click.prevent="enviar" class="btn btn-primary">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PrincipalMain',
  props: {
    msg: String
  },
  methods: {
    enviar: function () {
      this.$swal({
        title: '¿Seguro quiere enviar este audio?',
        text: "Se enviará este audio al servidor para ser procesado",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        preConfirm: () => {
          this.$swal({
            title: 'Procesando audio',
            allowOutsideClick: false,
            didOpen: () => {
                this.$swal.showLoading();
            }
          })
          const formData = new FormData()
          formData.append('audio', this.$refs.audio.files[0])
          this.axios.post("http://192.168.99.100:80/estado/abeja_reina/", formData)
            .then((response) => {
              this.$swal.close();
              this.$swal({
                icon: 'success',
                title: 'Resultado',
                html: `
                        Presencia de abeja reina: ${ (response.data.ABEJA_REINA.SI * 100).toFixed(2) } % </br>
                        Ausencia de abeja reina: ${ (response.data.ABEJA_REINA.NO * 100).toFixed(2) } %
                      `,
                allowOutsideClick: false,
              });
            })
            .catch((error) => {
              console.error("Se ha producido un error", error.message);
              this.$swal.close();
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
              })
            })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

button {
  background-color: #645CAA;
}
</style>
