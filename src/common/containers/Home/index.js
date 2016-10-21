import React from 'react';
import Helmet from 'react-helmet';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

function Home() {
  return (
    <div>
      <Helmet title="主页"/>
      <Jumbotron>
        <div className="container">
          <h1>React Redux Seed</h1>
          <p>使用React与Redux实现Universal渲染的种子工程</p>
          <p><Button bsStyle="primary">了解更多</Button></p>
        </div>
      </Jumbotron>
      <div className="container">
        <div>
          <h1 id="技术简介">技术简介</h1>
        </div>
        <div>
          <h2 id="react">React</h2>

          <p>
            毫不夸张地说，近年来最让全球JavaScript开发者感到疯狂的事情就是React的横空出世。作为一个构建用户界面的工具库，
            React被众多知名公司所使用，包括Facebook、Airbnb、Uber、Alibaba等。如果你想进入这些公司工作，那么你应该学习React。
          </p>

          <p>React官方是这样介绍它的：“一个声明式、高效、灵活的创建用户界面的JavaScript库。”这究竟是什么意思呢？下面我们来逐一解读。</p>

          <p>
            <strong>声明式</strong>是指只要使用React描述组件的样子就可以改变用户界面。传统方法是命令式地操作DOM，
            不仅需要记住大量的API，而且还会增加代码的耦合度，使得项目难以维护。React使用自己的魔法改变界面，
            让开发者最大限度地较少与DOM的交互，降低了处理视图的难度。
          </p>

          <p>
            <strong>高效</strong>主要得益于React的虚拟DOM，以及其Diff算法。传统的Diff算法的复杂度是极高的，
            而Facebook的工程师聪明地结合Web界面的特点改进了Diff算法，使其性能出众。拥有了高性能的Diff算法，
            我们就可以在“刷新”全部界面时只更新需要改变的那部分界面了。也正因为这个原因，React可以使用单向数据流改变界面，
            抛弃了传统的数据绑定，减少了样板代码和重量。
          </p>

          <p><strong>灵活</strong>是指React可以作为视图层与其他技术栈配合使用，比如代替Angular的指令，或者与Redux搭配等等。</p>

          <p>
            除了上面介绍的这些优点外，React最让人兴奋的莫过于Universal渲染和衍生的React
            Native项目了。Universal渲染指的是一套代码可以同时在服务端和客户端渲染，这也是本书重点介绍的技术。React
            Native则让你可以使用前沿的JavaScript为iOS、Android编写跨平台的原生APP。
          </p>

          <p>
            如果你对React究竟是什么还是很困惑，我的建议是，不用过于纠结，只管先用起来, 在实际的使用中慢慢理解它。
            本书将教你如何用React开发Web程序。
          </p>

        </div>
        <div>

          <h2 id="redux">Redux</h2>

          <p>Redux 是一个JavaScript状态容器，提供可预测的状态管理。</p>

          <p>Redux可以用这三条基本原则来描述：单一数据源；state只读；使用纯函数来执行修改。</p>

          <p>
            <strong>单一数据源</strong>是指整个应用的state被存储在一棵对象树中，并且这个对象树只存在于唯一一个store中。
            这里的state指的是数据。单一数据源是Redux区别与其他同类工具的一个重要特征。
          </p>

          <p>
            <strong>state只读</strong>并不代表我们无法改变state。如果无法改变state，那么程序将不会发生变化。
            这里“只读”指的是不允许直接对state这个变量重写赋值，但是可以通过action和reducer返回一个新的state，而且限制只能使用这一方法。
          </p>

          <p>
            <strong>使用纯函数来执行修改</strong>是指更新state的reducer只是一些纯函数，它接收先前的state和action，并返回新的state。
          </p>

          <p>
            了解上述基本原则后，或许你会问：“为何我要使用Redux？”这是个好问题！使用Redux将会给你的项目带来这些收益：
          </p>

          <ul>
            <li>
              <strong>可预测</strong>：Redux只有一个数据源，想要修改它只能发起action，reducer又是纯函数，
              相同的输入永远会得到相同的输出。这一切都使得程序运作变得可控可预测。
            </li>
            <li>
              <strong>便于组织管理代码</strong>：严格而明确的程序结构使得代码更容易去组织管理，同时也方便了团队协作。
            </li>
            <li>
              <strong>支持Universal渲染</strong>：单一数据源这个原则可以帮助解决Universal渲染中的数据传递问题：
              服务端渲染后只须给客户端传递一个变量即可，这个变量就是那颗单一state树。
            </li>
            <li>
              <strong>优秀的拓展能力</strong>：Redux支持多种拓展方式，但主要是中间件的拓展。
              中间件的使用使得原本简单的Redux变得十分强大。例如，Redux Thunk中间件使Redux的action创建函数具备了异步和条件判断能力，
              Logger for Redux中间件则可以为程序添加日志功能。
            </li>
            <li>
              <strong>容易测试</strong>：编写可测试的代码的最重要的一条规则就是去写单一功能的、没有外界依赖的小型函数。
              Redux的代码几乎都是这样小而纯且独立的函数。
            </li>
            <li>
              <strong>开发工具</strong>：开发者可以使用Redux的开发工具去实时追踪、回退和重放程序中action与state的每个变化。
            </li>
            <li>
              <strong>社区和生态系统</strong>：无论在什么时候，使用什么框架或库，社区和生态系统都是非常重要的。
              Redux背后的强大社区使其更加易用。
            </li>
          </ul>

          <p>
            Reducer的纯函数、不可变、函数组合，中间件的管道、柯里化这些思想都属于函数式编程的范畴。在Redux中，函数式编程被重度使用，
            甚至连“Redux”这个名字都充满了浓浓的函数式编程意味（reduce是函数式编程中经常使用的遍历累加数组元素的方法）。
            函数式编程使得代码变得更加简洁和模块化。熟悉函数式编程对于理解Redux的原理思想是非常有帮助的。
            本书将会在介绍Redux的同时，穿插函数式编程的知识拓展。希望你在读完本书后能够感受到Redux与函数式编程之美。
          </p>

        </div>
        <div>

          <h2 id="node与universal渲染">Node与Universal渲染</h2>

          <p>React与Redux既可以在浏览器端运行也可以在服务器端运行。这里的服务器端指的是Node服务器。</p>

          <p>
            Node和传统Web服务器之间的区别主要是：更简单，单线程，平台无关等。但最重要的是，
            它使用了JavaScript这门原来在浏览器中运行的语言，所以我们可以实现Universal渲染——用一套代码在服务端和客户端渲染。
          </p>

          <p>
            最初所有的渲染都是发生在服务器端的，但是在2005年，AJAX的到来将渲染过程转移到了客户端，
            通过调用服务器的API进行数据的获取和修改。此后诞生了无数的JavaScript框架来实现客户端渲染和路由控制。
            但是开发者们意识到一个问题：客户端渲染破坏了搜索引擎的索引，因为搜索引擎无法和JavaScript通话。
            除此之外，客户端渲染在第一次会加载较多模板和脚本，严重影响了网页打开的速度。
          </p>

          <p>
            很明显，我们需要同时在服务端和客户端进行渲染，而且最好共用一套代码。于是Universal渲染出现了。
            Universal渲染实现了更快的加载速度，更好的SEO，更优雅的交互效果，更容易维护的代码……这一切都关乎你或者你老板的项目利益。
            作为软件工程师，你应该明白这些，并引起足够的重视，用技术帮助项目盈利。
          </p>

          <p>React与Redux是实现Universal渲染的理想技术组合。本书会重点介绍使用React与Redux实现Universal渲染的最佳实践。</p>

        </div>
        <div>

          <h2 id="babel">Babel</h2>

          <p>Babel是一个JavaScript编译器，可以让开发者提前用到下一代的JavaScript。Babel可以和各种工具配合使用，包括如下这些工具。</p>

          <ul>
            <li>Babel的内建工具：Babel CLI、Require Hook。</li>
            <li>各种构建系统：Webpack、Gulp、Grunt、RequireJs等。</li>
            <li>测试框架：Jasmine、Karma、Mocha等。</li>
            <li>语言API：C#/.NET、Node、Ruby。</li>
            <li>模板引擎：Jade。</li>
            <li>编辑器：WebStorm。</li>
            <li>调试器：Node Inspector等。</li>
          </ul>

          <p>本书将在Node和浏览器两个环境中运行React与Redux程序，所以我们需要学习在Node和在Webpack中使用Babel。</p>

        </div>
        <div>

          <h2 id="webpack">Webpack</h2>

          <p>
            Webpack是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。
            通过加载器（loader）的转换，任何形式的资源都可以视作模块，
            比如CommonJs模块、AMD模块、ES2015模块、CSS、图片、JSON、Coffeescript、LESS 等。
          </p>

          <p>本书使用到的Webpack的功能主要包括：</p>

          <ul>
            <li>编译加载使用ES2015和JSX语法的模块</li>
            <li>实现开发服务器与热替换</li>
            <li>加载图片文件</li>
            <li>加载字体文件</li>
            <li>加载样式文件</li>
            <li>加载JSON文件</li>
            <li>使用同构工具实现同构渲染</li>
            <li>压缩代码</li>
            <li>哈希命名</li>
          </ul>

        </div>
        <div>

          <h2 id="总结">总结</h2>

          <p>
            React是一个声明式、高效、灵活的创建用户界面的JavaScript库，它所带来的Universal渲染更是一场革命。
            Redux是一个JavaScript状态容器，提供可预测的状态管理，单一数据源、只读state等特性使其从同类工具中脱颖而出。
            而使用Babel和Webpack做编译和构建则是开发React与Redux程序的最佳选择。
          </p>

          <p>让我们将循序渐进地学习使用这些现代前端技术。</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
