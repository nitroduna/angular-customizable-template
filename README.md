# Angular Customizable Template
===============================

> Tools to define angular directives using customizable templates.

### Demo

See the application demo to learn what the directives of this module provide. The demo shows
how you can define a directive based on a HTML template that include well defined insertion
points that allows the clients customize some parts of the directive using its own HTML.


### Some explanations

When you define a new directive based on a HTML template it is easy to define some
customizable parts using an isolated scope with properties linked to the directive attributes.

```javascript
{
    restrict: 'EA',
    templateUrl: 'directives/product-list.html',
    scope: {
        products: '=',
        header: '@',
        footer: '@'
    }
}
```

Then you can use the directive in your code customizing some texts of the directive template.

```html
<product-list products="app.cams" header="Cam Devices" footer="The most popular: {{app.cams[3].name}}">
</product-list>
```

But what if your client wants to replace the header of footer of the directive using HTML instead just
a simple text?.

### The solution that would be a very bad idea

A simple solution would be to let the clients to give a HTML template file in and attribute.
```javascript
{
    restrict: 'EA',
    templateUrl: 'directives/product-list.html',
    scope: {
        products: '=',
        header: '@',
        footer: '@',
        customHeader: '@',
        customFooter: '@',
    }
}
```

The client could write a template file with the new HTML and give the path of the HTML
to the directive.

```html
<product-list products="app.cams" custom-header="cam-header.html">
</product-list>
```

The template of the directive could be made customizable with some code like this one:

```html
<ng-include src="customHeader" ng-if="customHeader"></ng-include>
```

### What's the problem?

The "cam-header.html" file would be compiled and linked inside the template of the "product-list" directive.
The code of "cam-header.html" it is supposed to be written by a client of the "product-list" directive so
the client would expect to use the scope of its controllers also in the code of "cam-header.html". But as
the "cam-header" is included directly by the "product-list.html" template directive, the scope of the
customization of the client would be **the isolated scope** of the directive.

So the client of the directive would be force to use **$scope.$parent** in its own code, in the "cam-header.html"
directive. And that would really be a very bad bad idea. How can you know how many parents to transverse from
your own code to reach your own scope controller, when even a simple "ng-if" creates new nested scopes.

## The soluction of the Angular Customizable Templates

The directives of this module allows to define directives with customizable templates. You can define in your
directive what parts of the template allows customization. And the client of your directive can optionally customize
that parts using HTML that access the scope of theirs controllers.

```html
<product-list products="app.ropes">
    <!-- The template HTML that customize the "footer" part of the "product-list" directive -->
    <div ct-template-part="footer">
      <p class="panel-title"><strong>This is a template that customize the footer</strong></p>
      <ul>
        <li>You can change the whole HTML of the footer.</li>
        <li>You can access the scope where this custom footer is defined.</li>
        <li><strong>The most popular rope: </strong><i>{{app.ropes[2].name}}</i></app.ropes></li>
      </ul>
    </div>
</product-list>
```

The "product-list" directive of the demo allows a client to define several "ct-template-directives" that
with the HTML that will customize parts of the directive template. The "product-list" directive of the
demo application allows to customize two parts of the template identified with "header" and "fotter".

In the code above you can see how to define a the HTML that will customize the "footer" part of the
directive. The HTML of writen by the client will have access to the same scope that the "product-list"
directive, the scope expected by the client, and not the isolated scope of the "product-list" directive.

You can see the demo application to learn how the "product-list" directive allows the customization
of some parts using the "ct-template-part" directive.
