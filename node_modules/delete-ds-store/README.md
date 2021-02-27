# delete-ds-store

> Removes all .DS_Store files in the current directory recursively

💩 Turn this...

```
my-project/
--| .DS_Store
--| src/
-----| .DS_Store
-----| index.html
-----| js
-------| .DS_Store
-------| app.js
```

✨ ...into this

```
my-project/
--| src/
-----| index.html
-----| js
-------| app.js
```

## Installation

Use it as a global command.

**npm**

```
$ npm install -g delete-ds-store
```

**yarn**

```
$ yarn global add delete-ds-store
```

## Usage

```
$ cd /path/to/project
$ delete-ds-store
```