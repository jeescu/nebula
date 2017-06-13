![logo](https://raw.githubusercontent.com/jeescu/nebula/master/nebula-logo.png)

Node API middleware framework.

Build fast configurable and lightweight API gateway or API middleware  to your APIs and services.

>Entry point for your APIs and microservices.
>Implements architecture and principles.
>Extendable through plugins.
 
### Getting Started

#### Installation
Installing by npm

```
$ npm install nebula --save -g
```

#### Create a project
```
$ nebula create my_middleware
```

#### Create a model
A model can be your module or a group of modules.

```
$ nebula model
```

#### Create method on model
You can add more methods to your model by simply reentering the command below.

```
$ nebula method
```

Now you created a nebula project and initially added a sample model and methods.

### Deployment

Bundle your application.

```
$ nebula build
```

Then run node on the folder.

```
$ nebula
```

This is equivalent to `node index.js`

### Debugging
#### Development
Readable nebula errors should be thrown

#### Production
The build code is not minified but just simplified the structure and contents, so your code will still be readable as before.
