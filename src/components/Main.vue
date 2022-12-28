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
    formatearRespuesta: function (icon, estiloConclusion, estiloPresenciaAnomalia,
    estiloAusenciaAnomalia, conclusion) {
        return { 
            icon: icon,
            estilo: {
                conclusion: estiloConclusion,
                presencia_anomalia: estiloPresenciaAnomalia,
                ausencia_anomalia: estiloAusenciaAnomalia,
            },
            conclusion: conclusion
        }
    },
    enviar: function () {
      const archivo = this.$refs.audio.files[0];
      const nombreArchivo = archivo.name;
      const zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.$swal({
        title: `¿Seguro quiere procesar el archivo de audio: ${nombreArchivo}?`,
        text: "Se enviará ese audio al servidor para ser procesado",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, enviar.',
        cancelButtonText: 'No, cancelar.',
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
          formData.append('zonaHoraria', zonaHoraria)
          this.axios.post(process.env.VUE_APP_URL_API, formData)
            .then((response) => {
              const nombreArchivoAudio = response.data.audio
              const siPresenciaAnomalia = response.data.anomalias[0].si
              const noPresenciaAnomalia = response.data.anomalias[0].no
              const fecha = response.data.fecha
              const hora = response.data.hora
              let formatoRespuesta = this.formatearRespuesta(
                                                "error", "text-danger",
                                                "text-danger", "text-muted",
                                                "La colmena no tiene abeja reina"
                                                )
              if (noPresenciaAnomalia == siPresenciaAnomalia) {
                formatoRespuesta = this.formatearRespuesta(
                                                "warning", "text-warning",
                                                "text-warning", "text-warning",
                                                `No se puede determinar con claridad
                                                si hay o no abeja reina en la colmena`
                                                )
              }
              else if (noPresenciaAnomalia < siPresenciaAnomalia) {
                formatoRespuesta = this.formatearRespuesta(
                                                "success", "text-success",
                                                "text-muted", "text-success",
                                                "La colmena tiene abeja reina"
                                                )
              }
              this.$swal.close();
              this.$swal({
                icon: `${formatoRespuesta.icon}`,
                title: `Resultados obtenidos a partir del archivo de audio: ${nombreArchivoAudio}`,
                html: `
                        </br>
                          <div class="${formatoRespuesta.estilo.ausencia_anomalia}">
                              Probabilidad presencia de abeja reina: <strong>${(siPresenciaAnomalia * 100).toFixed(2)}%</strong>
                          </div>
                          <div class="${formatoRespuesta.estilo.presencia_anomalia}">
                              Probabilidad ausencia de abeja reina: <strong>${(noPresenciaAnomalia * 100).toFixed(2)}%</strong>
                          </div>
                        </br>
                        <h4 class="${formatoRespuesta.estilo.conclusion}">${formatoRespuesta.conclusion}</h4> </br>
                        <h5> Audio procesado el día ${fecha} a las ${hora} </h5>
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
