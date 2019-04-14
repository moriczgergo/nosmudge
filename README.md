# nosmudge
Removes smudges above threshold in black and white JPG files.

## Installation

```
npm i -g nosmudge
```

## Usage

```
nosmudge [options] <file>

Options:
  -V, --version                output the version number
  -t, --threshold [threshold]  Color threshold. Everything above will be removed. (0-255) (default: 100)
  -o, --output [filename]      Output filename. (default: filename_nosmudge.jpg)
  -h, --help                   output usage information
```