# 简单的AJAX包装
实现了简单的ajax包装

* 兼容IE
* 匹配了部分后端框架(如Django)CSRF预防
* 使用Promise调用。

见例子：

    import { ajax2 } from 'ajax'
    ajax2({
        type: 'GET',
        url: '',
        data: '',
        async: 'true'
    }).then(function(data){
        // 处理数据
    }).catch(function(err){
        // 处理错误
    })