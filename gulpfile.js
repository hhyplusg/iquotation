const pify = require('pify');
const fs = require('fs-jetpack');
const path = require('path');
const loadJsonFile = require('load-json-file');
const inline = pify(require('inline-source'));
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const cssnext = require('postcss-cssnext');
const browserSync = require('browser-sync').create();


const rollup = require('rollup').rollup;
const nodeResolve = require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const babel = require('rollup-plugin-babel');


const nunjucks = require('nunjucks');
const del = require('del');
nunjucks.configure('views', {
  noCache: true,
  watch: false,
  tags: {
    commentStart: '<#',
    commentEnd: '#>'
  }
});
const render = pify(nunjucks.render);

process.env.NODE_ENV = "development"
gulp.task('prod', () => {
  return Promise.resolve(process.env.NODE_ENV = 'production');
});

gulp.task('dev', () => {
  return Promise.resolve(process.env.NODE_ENV = 'development');
});

gulp.task('build-page', () => {
  
  const destDir = '.tmp';
  const pathDetail = loadJsonFile('views/data/path-detail.json');
  // const dataPath = 'views/data/data.json';
  // detail返回promise
  return pathDetail.then(data => {
    const demos = data.demos;
    //  此运行完之后再返回promise，进行循环返回promise
    return Promise.all(demos.map((demo) => {
      return renderPerView(demo);
    }))
  })
  .then(() => {
    console.log('inline--'+process.env.NODE_ENV)
      browserSync.reload('*.html');
      // return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
    });

 
  async function renderPerView(demo){
    const env = {
      isProduction: process.env.NODE_ENV === 'production'
    };
    
    const name = demo.name;
    const template = demo.template;
    const dataPath = demo.data;
  
      return loadJsonFile(dataPath)
      .then(data => {
        
        if (name ==='login'){

          return render(template, {
            products: data.index,
            env
          });
        }else if (name ==='askprice'){
          return render(template, {
            products: data.index,
            env
          });
        }else{
          return render(template, {
            env
          });
        }
        
      })
      .then(html => {  
        // console.log('process.env.NODE_ENV:'+process.env.NODE_ENV);
        // 此处是development  
        // if (process.env.NODE_ENV === 'production') {
        //   return inline(html, {
        //     compress: true,
        //     rootpath: path.resolve(process.cwd(), '.tmp')
        //   });
        // }    
        return html;
      })
      .then(html => {
          const destFile = path.resolve(destDir, `${name}.html`);
          return fs.writeAsync(destFile, html);
      })


  }
  
});

// ,'client/bootstrap-3.3.7/*/*.css'
gulp.task('styles', function styles() {
  const DEST = '.tmp/styles';
  return gulp.src(['client/styles/*.scss'])
    .pipe($.changed(DEST))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream());
});

gulp.task('copybt', () => {
  const dest = '.tmp/bootstrap';
  return gulp.src(['./client/bootstrap-3.3.7/**'])
    .pipe(gulp.dest(dest))
});
gulp.task('copybtable', () => {
  const dest = '.tmp/plugin';
  return gulp.src(['./bower_components/bootstrap-table/dist/**'])
    .pipe(gulp.dest(dest))
});
gulp.task('sweetAlert', () => {
  const dest = '.tmp/sweetAlert';
  return gulp.src(['./client/sweetAlert/**'])
    .pipe(gulp.dest(dest))
});

gulp.task('jquery', () => {
  const dest = '.tmp/jquery';
  return gulp.src(['./client/jquery/**'])
    .pipe(gulp.dest(dest))
});

gulp.task('bootstrap', gulp.series('copybt','sweetAlert','jquery'));

gulp.task('jshint', function () {
  return gulp.src('client/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// gulp.task('scripts', () => {
//   return gulp.src('index.js')
//     .pipe($.plumber())  //自动处理全部错误信息防止因为错误而导致 watch 不正常工作
//     .pipe($.sourcemaps.init({loadMaps:true})) 
//     .pipe($.babel())
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('.tmp/scripts'))
//     .pipe(browserSync.reload({stream: true}));
// });

gulp.task('scripts', async () => {
  const origami = await fs.readAsync('views/data/path-detail.json','json');
  const demos = origami.demos;
  async function rollupOneJs(demo) {
    const bundle = await rollup({
      input:`client/scripts/${demo.js}`,
      plugins:[
        babel({//这里需要配置文件.babelrc
          exclude:'node_modules/**'
        }),
        nodeResolve({
          jsnext:true,
        })
      ]
    });

    await bundle.write({//返回promise，以便下一步then()
        file: `.tmp/scripts/${demo.js}`,
        format: 'iife',
        sourcemap: true
    });
  }
  //console.log(demos);
  await demos.forEach(rollupOneJs);
  browserSync.reload();
});



gulp.task('comJs', () => {
  return gulp.src('.tmp/scripts/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('.tmp/scripts/'));
});
gulp.task('comCss', () => {
  return gulp.src('.tmp/styles/*.css')
    .pipe($.cssnano())
    .pipe(gulp.dest('.tmp/styles/'));
});


gulp.task('clean', () => {
  return del(['.tmp/**','.dest/**']);
});

gulp.task('jshint', function () {
  return gulp.src('client/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});


gulp.task('serve', gulp.parallel('build-page', 'bootstrap','styles', 'scripts','comJs','comCss' ,() => {
  browserSync.init({
    server: {
      baseDir: ['.tmp'],
      index: 'index.html',
      directory: true,
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(['views/*.{html,json}'], 
    gulp.parallel('build-page')
  );

  gulp.watch(['client/**/*.scss'],
    gulp.parallel('styles')
  );

  gulp.watch(['client/**/*.js'],
    gulp.parallel('scripts')
  );

  gulp.watch(['/*.js'],
    gulp.parallel('scripts')
  );

}));

gulp.task('build', gulp.series('prod','clean','bootstrap','build-page','styles', 'scripts', 'comJs','comCss', 'dev'));


const destDir = 'dev_www/frontend/tpl/next/html';

gulp.task('copy:prod', () => {
  const src = path.resolve(__dirname, '.tmp/index.html');
  const dest = path.resolve(__dirname, `../${destDir}`);
  console.log(`Copy index.html to ${dest}`);
  return gulp.src(src)
    .pipe($.rename('membership.html'))
    .pipe(gulp.dest(dest));  
});


gulp.task('deploy', gulp.series('build', 'copy:prod'));



gulp.task('copy', () => {
  const dest = 'ftac';
  return gulp.src(['.tmp/subscription.html'])
    .pipe(gulp.dest(`../${dest}`))
});



