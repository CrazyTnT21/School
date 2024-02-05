export class AppChart extends HTMLElement
{
  get title()
  {
    return this.getAttribute("data-title");
  }

  set title(value)
  {
    this.setAttribute("data-title", value);
  }

  get subtitle()
  {
    return this.getAttribute("data-subtitle");
  }

  set subtitle(value)
  {
    this.setAttribute("data-subtitle", value);
  }

  #labels = [];
  get labels()
  {
    return this.#labels;
  }

  set labels(value)
  {
    this.#labels = value;
  }

  #datasets = [];
  get datasets()
  {
    return this.#datasets;
  }

  set datasets(value)
  {
    this.#datasets = value;
  }

  #scales = {};
  get scales()
  {
    return this.#scales;
  }

  set scales(value)
  {
    this.#scales = value;
  }

  #options = {
    devicePixelRatio: 4,
    maintainAspectRatio: false,
    maxRotation: 0,
  };
  get options()
  {
    return this.#options;
  }

  set options(value)
  {
    this.#options = value;
  }

  #plugins = {};
  get plugins()
  {
    return this.#plugins;
  }

  set plugins(value)
  {

  }

  setPlugin(property, value)
  {
    this.#plugins[property] = value;
  }

  #chart;

  connectedCallback()
  {
    this.loadChart();
  }

  loadChart()
  {
    const data = {
      labels: this.#labels,
      datasets: this.#datasets,
    };
    this.#options.plugins = this.#plugins;
    const title = this.title;
    if (title)
      this.#options.plugins.title = {
        display: true,
        text: title,
        font: {
          size: 32,
        },
      };

    const subtitle = this.subtitle;
    if (subtitle)
      this.#options.plugins.subtitle = {
        display: true,
        text: subtitle,
        font: {
          size: 16,
        },
      };

    this.#options.scales = this.#scales;

    const config = {
      type: this.#type,
      data: data,
      options: this.#options,
    };
    this.#chart = this.#createChart(config);
  }

  disconnectedCallback()
  {
  }

  constructor()
  {
    super();

    this.attach();
    this.render();
  }

  attach()
  {
    this.attachShadow({mode: "open"});
  }

  render()
  {
    //language=HTML
    this.shadowRoot.innerHTML = `
      <style>
        ${this.styleCSS()}
      </style>
      <canvas></canvas>
    `;
  }

  styleCSS()
  {
    //language=CSS
    return `
      canvas {
        width: 100%;
        height: 100%;
      }
    `;
  }

  #type = "line";
  get type()
  {
    return this.#type;
  }

  set type(value)
  {
    this.#type = value;
  }

  #createChart(config)
  {
    const chartElement = this.shadowRoot.querySelector("canvas");
    if (this.#chart)
      this.#chart.destroy();

    return new Chart(chartElement, config);
  }
}

const Chart = window.chartJs.Chart;

customElements.define("app-chart", AppChart);