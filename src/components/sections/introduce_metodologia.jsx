import ProblemFlow from "../ui/graphics/metodologia_problem_flow.jsx";
import SolutionFlow from "../ui/graphics/metodologia_solution_flow.jsx";
import "../../style/introduce.css";

function IntroduceMetodologia() {
  return (
    <section>
      <section id="metodologia" className="metodologia-container">
        <div className="metodologia-content">
          <h1 className="metodologia-title">
            Metodología de personalización no invasiva asistida por IA
          </h1>
          <p className="metodologia-description">
            Una metodología técnica para personalizar plataformas digitales con código fuente restringido, utilizando una capa externa de intervención, documentación contextual e inteligencia artificial para acelerar la implementación sin alterar la base original.
          </p>
        </div>
      </section>

      <section id="problema" className="problema-container">
        <div className="problema-content">
          <h2 className="problema-title">Resumen del proyecto</h2>
          <p className="problema-description">
            Este proyecto surge de la necesidad de personalizar experiencias digitales sobre una plataforma ya estructurada, con una restricción crítica: el código fuente original no podía modificarse directamente. El objetivo fue transformar un proceso manual, repetitivo y de alto consumo de tiempo en una metodología más rápida, consistente y reutilizable. Para lograrlo, se diseñó un flujo de trabajo basado en intervención externa, análisis estructural de la interfaz nativa y uso de inteligencia artificial como apoyo para acelerar la generación de soluciones técnicas.
          </p>
        </div>

        <div className="problema-content">
          <h2 className="problema-title">El Problema</h2>
          <h3 className="problema-subtitle">Limitaciones en plataformas con código fuente restringido</h3>
          <p className="problema-description">
            En plataformas cerradas o parcialmente controladas, la personalización suele estar limitada por la imposibilidad de modificar el código fuente original. Esto obliga a intervenir sobre una estructura existente, con jerarquías, dependencias y comportamientos que deben respetarse. Antes de esta metodología, cada nuevo proyecto requería análisis manual, pruebas repetitivas y ajustes casi artesanales. Aunque el resultado final era funcional, el proceso consumía mucho tiempo, dependía demasiado de la memoria técnica y dificultaba reutilizar conocimiento entre proyectos.
          </p>
          <p className="problema-description">
            Para resolver este problema, diseñé una metodología de personalización no invasiva basada en tres principios: entender la estructura nativa, documentar patrones reutilizables y construir un contexto técnico que permitiera usar inteligencia artificial de forma más precisa.
          </p>
          <p className="problema-description">
            En lugar de intervenir la plataforma de manera improvisada, el proceso se organizó como una capa externa de trabajo. Primero se analiza la interfaz original, luego se identifican patrones y restricciones, y finalmente se genera una solución asistida por IA que respeta el comportamiento existente del sistema.
          </p>
          <p className="problema-description">
            El valor de la IA no estuvo simplemente en generar código, sino en trabajar con un contexto claro: restricciones del entorno, patrones de la página nativa y una forma específica de escribir soluciones fáciles de revisar, mantener e integrar.
          </p>
        </div>

        <div className="problema-content">
          <h2 className="problema-title">Diagrama del problema</h2>
          <ProblemFlow />
          <p className="problema-description">
            La restricción inicial del proyecto condicionaba todo el flujo de trabajo. Al no poder modificar la base original, cualquier personalización debía construirse como una intervención externa. Esto obligaba a interpretar la estructura nativa en cada caso, validar cuidadosamente los puntos de intervención y evitar afectar componentes existentes.
          </p>
          <p className="problema-description">
            El problema no estaba solo en escribir código, sino en repetir constantemente el mismo proceso de análisis, adaptación y validación. Esta repetición hacía que el trabajo fuera funcional, pero poco escalable.
          </p>
        </div>
      </section>

      <section id="solucion" className="solucion-container">
        <div className="solucion-content">
          <h2 className="solucion-title">La Solución</h2>
          <h3 className="solucion-subtitle">Metodología de personalización no invasiva asistida por IA</h3>
          <p className="solucion-description">
            Para resolver este problema, diseñé una metodología de personalización no invasiva basada en tres principios: entender la estructura nativa, documentar patrones reutilizables y construir un contexto técnico que permitiera usar inteligencia artificial de forma más precisa.
          </p>
          <p className="solucion-description">
            En lugar de intervenir la plataforma de manera improvisada, el proceso se organizó como una capa externa de trabajo. Primero se analiza la interfaz original, luego se identifican patrones y restricciones, y finalmente se genera una solución asistida por IA que respeta el comportamiento existente del sistema.
          </p>
          <p className="solucion-description">
            El valor de la IA no estuvo simplemente en generar código, sino en trabajar con un contexto claro: restricciones del entorno, patrones de la página nativa y una forma específica de escribir soluciones fáciles de revisar, mantener e integrar.
          </p>
        </div>

        <div className="solucion-content">
          <h2 className="solucion-title">Diagrama de la solución</h2>
          <SolutionFlow />
        </div>
      </section>
    </section>
  );
}

export default IntroduceMetodologia;
