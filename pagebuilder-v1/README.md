# Angular GrapesJS Integration

## Install project dependencies
In the project's root directory, run the following command to install the project dependencies:
```powershell
npm install
```
## Serve the application
After the dependencies are installed, start the development server and serve the Angular application by running the following command:
```powershell
ng serve
```
Open a web browser and navigate to [http://localhost:4200](http://localhost:4200) to see the running application.
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
```powershell
ng build
```
Run `ng build --configuration=development` to build for the development environment
```powershell
ng build --configuration=aws-dev
```



## GrapesJS Extensions
The example is trying to add "grapesjs-plugin-forms" into the project

1. Go to [GrapesJS Github Page](https://github.com/GrapesJS/grapesjs)
2. Go to Extensions section, and find "grapesjs-plugin-forms", and Click it
3. Check the Usage - Modern Javascript
4. Install "grapesjs-plugin-forms" into your project by: 
```
C:\Users\stg\Documents\Projects\PageBuilder\pagebuilder-v1>npm install grapesjs-plugin-forms
```
5. Use the extension as Usage - Modern Javascript describes (import & plugins)

## SVG & Canvas Integration

[echarts](https://echarts.apache.org/en/index.html)

[d3js](https://d3js.org)

[chatjs](https://www.chartjs.org/)


## Note
1. GrapesJS is not working with Angular SSR (Server-Side Rendering)
