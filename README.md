# [Toyhouse Profile Editor](http://toyhouseprofileeditor.netlify.com)

[Toyhou.se](http://toyhou.se) doesn't support CSS classes in profile pages natively, and this compiled with the difficult editor can make it far more daunting to make themes and profile pages of your own, even if you can understand HTML.

This tool allows you to use CSS classes in your HTML, which will be converted to inline <code>style</code> attributes so you can use it on Toyhouse.

Be sure to follow the special rules below, though, as there are some fiddly bits.

## How to use

The goal of this tool is to let you code your site as normal, but also make it easy to put this on Toyhouse. Thus, while most HTML and CSS should work fine, there are a few special rules when using this.


- Classes should be defined in a `className` attribute, rather than a `class` attribute. The regular `class`es will be preserved, while the `className`s will be converted.

- The `className` attribute must appear as the first attribute in the tag. (eg. `<button className="custom1" ...>`).

- You can specify multiple classes in a tag, leaving a space between each one. Regular naming rules still apply (no spaces).

- Currently, only one CSS class is allowed per set of attributes. In other words, this will **NOT** work: 

```.class1, .class2 { color: white; }```


## Lastly

If something goes wrong, leave a description of it [here](https://github.com/IEVEVO/ToyhouseEditor/issues) and I'll try to help. :)


---
# Download
You can download a version of this for offline use. The only thing that doesn't work is changing themes, to my knowledge. You might experience issues with profiles too, however, so I wouldn't save anything too important in there.

All you need to do is download the latest version (.ZIP) from [here](https://github.com/IEVEVO/ToyhouseEditor/releases) and run the `index.html` file. I'd recommend extracting it into a folder first, but you don't have to.

Alternatively, there's a demo up [here](http://toyhouseprofileeditor.netlify.com).
