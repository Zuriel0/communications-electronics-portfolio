import "../../style/introduce.css";
import LoadBalancerTraceabilityDiagram from "../ui/graphics/flow_loadbalance";
import BusinessFlowDiagram from "../ui/graphics/bussiness_flow";
import LogicFlow from "../ui/graphics/logic_flow";

function Introduce() {
    return (
        <section>
            <section id="introduce" className="introduce-container">
                <div className="introduce-content">
                    <h1 className="introduce-title">monitor concurrente de logs por SSH</h1>
                    <p className="introduce-description">Desarrollé una solución de línea de comandos para monitorear logs remotos en tiempo real desde Ubuntu, conectándose concurrentemente por SSH a 6 servidores web y 1 servidor RADIUS activo. El sistema busca una MAC address específica, identifica el servidor de origen y aplica reglas de ejecución diferenciadas para cada grupo.</p>
                </div>
            </section>
            <section id="problema" className="problema-container">
                <div className="problema-content">
                    <h2 className="problema-title">El Problema</h2>
                    <h3 className="problema-subtitle">Trazabilidad de peticiones en una arquitectura distribuida con balanceo de carga</h3>
                    <p className="problema-description">En una arquitectura escalable horizontalmente, varios servidores web pueden cumplir exactamente la misma función. Sin embargo, cuando un usuario realiza una petición, el balanceador de carga decide dinámicamente a qué servidor enviarla. Esto complica la trazabilidad operativa, ya que al momento de buscar una MAC address específica no es posible saber de antemano en cuál de los servidores web fue procesada la solicitud.</p>
                    <LoadBalancerTraceabilityDiagram />
                    <p className="problema-description">Para resolver este problema, diseñé una herramienta que realiza búsqueda concurrente sobre los seis servidores web, permitiendo monitorear en tiempo real todos los puntos posibles donde pudo haber pasado la petición. De esta forma, se elimina la necesidad de revisar servidor por servidor manualmente y se agiliza significativamente el tiempo de diagnóstico. El proyecto contempla precisamente el monitoreo concurrente de 6 servidores web y 1 servidor RADIUS activo por ejecución.</p>
                    <p className="problema-description">En la capa de autenticación ocurre una situación similar. Existen dos servidores RADIUS con la misma función: uno principal y otro de respaldo o apoyo para liberar carga. Aunque en la operación diaria normalmente se utiliza un único servidor RADIUS en la mayoría de los casos, el sistema deja preparada la posibilidad de seleccionar cualquiera de los dos desde configuración, manteniendo flexibilidad para escenarios de contingencia o crecimiento. La especificación también contempla 2 servidores RADIUS disponibles, pero solo 1 activo por ejecución.</p>
                    <BusinessFlowDiagram />
                    <br />
                    <h3 className="problema-subtitle">
                        1. Enfoque de la solución
                    </h3>
                    <p className="problema-description">Para resolver la dificultad de identificar en qué servidor fue procesada una petición dentro de una arquitectura balanceada, diseñé una herramienta de monitoreo concurrente que centraliza la búsqueda de una MAC address en todos los nodos relevantes del flujo. En lugar de revisar manualmente servidor por servidor, la solución ejecuta búsquedas simultáneas sobre los 6 servidores web y el servidor RADIUS activo, permitiendo detectar coincidencias en tiempo real desde una sola consola.</p>
                    <h3 className="problema-subtitle">
                        2. Cómo aborda el problema web
                    </h3>
                    <p className="problema-description">Dado que el balanceador de carga distribuye dinámicamente las peticiones entre varios servidores web que cumplen la misma función, no es posible saber de antemano en cuál de ellos fue atendida la solicitud asociada a una MAC específica. Por eso, la solución aborda el problema monitoreando de forma concurrente los seis servidores web, eliminando la dependencia de una búsqueda secuencial y reduciendo el tiempo necesario para ubicar el evento.</p>
                    <h3 className="problema-subtitle">
                        3. Cómo aborda el flujo con RADIUS
                    </h3>
                    <p className="problema-description">Una vez que el flujo web concluye correctamente, la autenticación continúa hacia el servidor RADIUS. Aunque existen dos servidores RADIUS con la misma función, en la práctica normalmente se opera con un único servidor activo y se deja el secundario como respaldo. La herramienta contempla este escenario permitiendo definir por configuración cuál servidor RADIUS se monitorea en cada ejecución, manteniendo flexibilidad para operación normal o contingencia.</p>
                    <h3 className="problema-subtitle">
                        4. Valor de la solución
                    </h3>
                    <p className="problema-description">Con este enfoque, la solución reduce una tarea manual, distribuida y lenta a un proceso centralizado, concurrente y orientado a respuesta rápida. Además de acelerar el diagnóstico, permite seguir el flujo natural de la operación, primero web y luego RADIUS sin perder visibilidad sobre ninguno de los dos dominios. La arquitectura también mantiene independencia entre el grupo web y el grupo RADIUS, lo que evita afectar la autenticación por eventos detectados en la capa web.</p>
                </div>
            </section>
            <section id="solucion" className="solucion-container">
                <div className="solucion-content">
                    <h2 className="solucion-title">La Solución</h2>
                    <h3 className="solucion-subtitle">Monitoreo concurrente, búsqueda en tiempo real y trazabilidad de eventos por MAC</h3>
                    <p className="solucion-description">Esta herramienta automatiza la búsqueda de una MAC address dentro de un flujo distribuido. Desde una única ejecución en Ubuntu, se conecta por SSH a los servidores relevantes, monitorea sus logs en tiempo real y centraliza la detección de coincidencias para identificar rápidamente dónde fue procesada una petición y cómo continúa su flujo hacia autenticación.</p>
                    <LogicFlow />
                    <br /><br />
                    <h3 className="solucion-subtitle">Qué hace el sistema</h3>
                    <p className="solucion-description">La solución automatiza la trazabilidad de una MAC address dentro de una arquitectura distribuida. A partir de una única ejecución en Ubuntu, el sistema valida la entrada, carga la configuración y se conecta por SSH a los nodos involucrados en el flujo operativo para monitorear logs en tiempo real.</p>
                    <p className="solucion-description">Monitorea concurrentemente los seis servidores web, permitiendo identificar en cuál de ellos fue procesada la petición que el balanceador distribuyó dinámicamente. Al mismo tiempo, supervisa el servidor RADIUS activo para seguir la continuidad del flujo de autenticación cuando la fase web concluye correctamente.</p>
                </div>
            </section>

        </section>
    );
}

export default Introduce;


