

Good morning. I'm Jessica Kerr, better known as Jessitron, and I'm happy to be talking about TypeScript today. TypeScript for the Enterprise -- especially the Java/C# developer. TypeScript on the back end, on the server, on Node. If you're doing front end development, half of this talk applies. If you're doing JavaScript on Node, at least half of this talk applies. The agenda for today is: 5  things I love about TypeScript, and 5 things that I found infuriating (but you won't, because you'll expect them, so they won't bite you).

What is TypeScript? It's a compiler, from TypeScript to JavaScript. It's a language, a superset of JavaScript. So the compiler is essentially a function:

JavaScript + some types => tsc => JavaScript + some type errors.

l love TypeScript because (#1 and biggest reason) it lets you use types as much as you want and not when you don't.
The reason they did that, is so you could take .js files and rename them .ts and poof, you have TypeScript. Then you can add types where you want them,
but not require them. Then, there's all these compiler options that you can start in to gradually make the compiler stricter, so you get more and more type
errors, and then you fix them, and your code gets safer and safer and more and more readable (in my strong opinion).

tsc has a crapton of options. So many that you use a configuration file. Not like javac where you probably pass a classpath, so you do that on the command line.
With TypeScript you start with a tsconfig.json. (not strictly json, because the compiler also supports comments.) If you run `tsc --init` it generates one of these for you.
See, already this compiler is doing more than compile. I told you it was a function from JS + types to JS + type errors, but see, it's like a JavaScript function, where you can add on more attributes.

Right. so here's your starter tsconfig.json [show], and here's a bunch of options. We'll only talk about a few. When you get serious about TypeScript, I highly recommend studying the compiler option documentation.
The ones about how strict to be are here, there's like half a dozen of them. My two favorites are noImplicitAny and strictNullChecks. Where by favorite I mean "enemy." But the good kind of enemy, the kind that keeps you on your toes. Yeah.

Let's see some of the many levels of typing available in TypeScript.

```
function printStatus(status) {
 console.log(`status is ${status}`);
}
printStatus("running");
```

This is valid JS (except for the interpolated string). We can look at index.js, the compiled output, and wow, it looks just like the input.
Thing I love about TS #?: It aims to produce readable bytecode. More on that later.
We can run this with ts-node on the .ts, or node on the .js. Okay.

Now, let's close in on some type safety. This parameter here, we don't declare a type for it at all. Tut tut. That means TypeScript infers the type "any" which means "I have no idea so I'll let you do what you want." You can put anything in an any, and you can ask for any property. I could be like, status.timestamp and TS is like "OK, you know more about this type than I do."

Before I add a type declaration, I'll make TS tell me I have to. In the tsconfig, I set noImplicitAny to `true` and poof, I get an error here.
I can tell it explicitly that it's an any. Now I don't have any more type safety but at least I'm being explicit about my lack of info.

Next, let's make it make me use a more explicit type. The compiler won't do that. Buuut here's the thing about TypeScript: the compiler is a library. It's a library that gets used by tslint. The linter in TypeScript is another phase where you can choose to check errors.
In addition to tsconfig.json, you also want tslint. It has way more capability than jslint, because it's using the type information. It comes with a bunch of recommended rules in this "extends" clause, that's the built-in recommendations. What are they? well, you'll find out when you hit them. Like now: let's run `tslint --project .`

It complains about the console.log. I could override that rule, buuuut maybe I don't want to. And here's the lovely bit about tslint: you can scope it.

`    // tslint:disable-next-line:no-console`

So linting is another compile phase, in the sense that it produces more errors for you. But you can scope it! You can turn off the compiler checking by using `any` and the linting by using these comments. Line level or file level or portions of it. Because let's face it, sometimes convincing the compiler that your code is valid is not worth the puzzle. This is flexibility. This is pragmatism.
We'll see another example of that later.

Right now this comment is bugging me so I am gonna override the rule.
While we're here, I'll set "no-any" to true.

Run tslint again.

Now I see the error I want to see: that this "any" type is not specific enough. TypeScript and tslint let you tune your error messages. You can play the "Make wrong code not compile" game exactly as far as it's helping you, and no farther.

Make it accept a string.

Now it will accept a string. If I try to call the function with no arguments of course I get an error -- although it does output the JS, I love that! The emission of output and of errors are separated, because you are giving it JS, it can always give you JS back. Might not work, but you're free to run it.
The compiler will get happy if I pass in undefined, though. I can change that by setting "strictNullChecks" to true.
Now it won't let me pass undefined unless I tell it that it can be string | undefined. Foreshadowing of #3, union types.
Alternately, I can set the parameter to optional, which lets me not pass anything.

OK. But let's make this stricter, and I'll show you my favorite thing about TS #2: literal string types. I can tell it that the status
has to be literally "running". I can tell it that this function returns specifically 0.
What, why?
TypeScript has the challenge not only of working with all JS of every version, but also all the major JS libraries. The type system has to be able to type ... JQuery.

When you start from JavaScript, everything gets the type "any." Which means "I don't know."


