<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
  </div>
  <div>
    <form>
      <div class="mb-3">
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
      const archivo = this.$refs.audio.files[0];
      const nombreArchivo = archivo.name;
      this.$swal({
        title: `¿Seguro quiere procesar el archivo de audio: ${nombreArchivo}?`,
        text: "Se enviará ese audio al servidor para ser procesado",
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
          formData.append('audio', archivo)
          this.axios.post(process.env.VUE_APP_URL_API, formData)
            .then((response) => {
              const nombreArchivoAudio = response.data.audio
              const siPresenciaAnomalia = response.data.anomalias[0].si
              const noPresenciaAnomalia = response.data.anomalias[0].no
              let conclusion = "La colmena no tiene abeja reina"
              if (noPresenciaAnomalia == siPresenciaAnomalia) {
                conclusion = "No se puede determinar con claridad si hay o no abeja reina en la colmena"
              }
              else if (noPresenciaAnomalia < siPresenciaAnomalia) {
                conclusion = "La colmena tiene abeja reina"
              }
              this.$swal.close();
              this.$swal({
                icon: 'success',
                title: `Resultados obtenidos a partir del archivo de audio: ${nombreArchivoAudio}`,
                html: `
                        </br> <h4>${conclusion}</h4> </br>
                        Probabilidad presencia de abeja reina: <strong>${(siPresenciaAnomalia * 100).toFixed(2)}%</strong> </br>
                        Probabilidad ausencia de abeja reina: <strong>${(noPresenciaAnomalia * 100).toFixed(2)}%</strong> </br></br>
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
  margin: 20px;
  color: white;
}

button {
  background-color: #645CAA;
}

</style>
