module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
          
        // react: {
        //     options: {
                
        //         plugins: ['transform-react-jsx'],
        //         presets: ['es2015', 'react']
        //     },
        //     files: {
        //         expand: true,
        //         cwd: 'public/script/jsx/',
        //         src: ['*.jsx'],
        //         dest: 'public/script/js',
        //         ext: '.js'
        //     }
             
            
        // },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                        expand: true,
                        cwd: 'public/script/js',
                        src: '*.js', //所有js文件
                        ext: '.js',
                        dest: 'dist/public/script' //输出到此目录下
                    }]
                    
            }
        },
        //less插件配置
        less: {
            main: {
                expand: true,
                cwd: 'public/less',
                src: '*.less',
                dest: 'public/style/css',
                ext: '.css'
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress: false
                }
            }
        },


        //css压缩插件
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/public/style/css',
                    src: '*.css',
                    dest: 'dist/public/style',
                    ext: '.css'
                }]
            }
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'views/html',
                    src: ['*.html'],
                    dest: 'dist/views'
                }]
            }
        },
        //css前缀
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')()

                ]

            },

            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/style/css',
                    src: ['*.css'],
                    dest: 'dist/public/style/css',
                    ext: '.css'
                }]

            }
        },


        watch: {
            client: { //用于监听less文件,当改变时自动编译成css文件
                files: ['./public/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            clientcss: { //用于监听css文件,当改变时自动压缩css文件
                files: ['./public/style/css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            }

        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-postcss'); 
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('babel-preset-es2015');

    // 默认被执行的任务列表。less postcss cssmin uglify htmlmin  
    //告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
    grunt.registerTask('default', ['postcss','cssmin','uglify','htmlmin', 'watch']);

};