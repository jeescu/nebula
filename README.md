![logo](https://raw.githubusercontent.com/jeescu/nebula/master/nebula-logo.png)

> A simple NodeJS API / micro-service project generator.

### Installation

```bash
> npm install @jeescu/nebula -g
```

### Getting Started

See available command options.

```bash
> nebula --help
```

#### Create project

```bash
> nebula create my_project
```

Change dir to your project so you can execute the next available commands.

#### Creating predefined controller, model, migration and seeder files

```bash
> nebula add:model facet
> nebula add:controller facet
> nebula add:migration create_facet_table
> nebula add:seeder table_facet_seeder
```

#### Executing migrations and seeders

See [Knex](https://knexjs.org) official documentation.

#### Contributors:
- Richard Malibiran ([rmalibiran](https://github.com/rmalibiran)): core templates owner.