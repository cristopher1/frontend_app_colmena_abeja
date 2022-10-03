<template>
  <!-- Navigation-->
        <nav class="navbar bg-dark static-top">
            <div class="container">
                <a class="navbar-brand text-color">Api Colmena Abeja</a>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead">
            <div class="container position-relative">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <div class="text-center text-blue">
                            <PrincipalMain msg="Consulte el estado del panal"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- Icons Grid-->
        <section class="features-icons bg-dark text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex"><i class="bi-file-text m-auto text-primary"></i></div>
                            <h3>Seleccionar audio</h3>
                            <p class="lead mb-0">Seleccione el archivo de audio que desea procesar.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex"><i class="bi-upload m-auto text-primary"></i></div>
                            <h3>Enviar archivo</h3>
                            <p class="lead mb-0">El archivo seleccionado será enviado al servidor para ser procesado.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div class="features-icons-icon d-flex"><i class="bi-graph-up m-auto text-primary"></i></div>
                            <h3>Ver resultados</h3>
                            <p class="lead mb-0">Obtenga desde el servidor la información asociada al estado de la colmena.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Image Showcases-->
        <section class="showcase showcase-background">
            <div class="container-fluid p-0">
                <div class="row g-0">
                    <div class="col-lg-6 order-lg-2 showcase-img" style="background-image: url('../img/bg-showcase-1.jpg')"></div>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Seleccionar audio</h2>
                        <p class="lead mb-0">Puede seleccionar archivos de audio con diferentes formatos, por ejemplo: .wav, .mp3, .ogg, entre otros.</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-lg-6 text-white showcase-img" style="background-image: url('../img/bg-showcase-2.jpg')"></div>
                    <div class="col-lg-6 my-auto showcase-text">
                        <h2>Enviar archivo</h2>
                        <p class="lead mb-0">Luego de seleccionar el archivo de audio, presione el botón enviar para que el servidor se encargue de procesarlo.</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-lg-6 order-lg-2 text-white showcase-img" style="background-image: url('../img/bg-showcase-3.jpg')"></div>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Ver resultados</h2>
                        <p class="lead mb-0">Obtenga información sobre la presencia o ausencia de abeja reina en la colmena.</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Footer-->
        <footer class="footer bg-dark">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 h-100 text-center text-lg-start my-auto">
                        <p class="text-muted small mb-4 mb-lg-0">&copy; Api Colmena Abeja 2022. Basado en diseño extraído de <a href="https://startbootstrap.com/theme/landing-page" target="_blank"> startbootstrap. </a></p>
                    </div>
                </div>
            </div>
        </footer>
</template>

<script>
import PrincipalMain from './components/Main.vue'

export default {
  name: 'App',
  components: {
    PrincipalMain
  }
}
</script>

<style>

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #645CAA;
}
</style>
