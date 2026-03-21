window.jetpackModules=window.jetpackModules||{};window.jetpackModules.models=(function(window,$,Backbone){'use strict';var models={};models.Modules=Backbone.Model.extend({visibles:{},filter_and_sort:function(){var subsubsub=$('.subsubsub .current a'),items=Object.values(this.get('raw')),m_filter=$('.button-group.filter-active .active'),m_sort=$('.button-group.sort .active'),m_search=$('#srch-term-search-input').val().toLowerCase();if(!subsubsub.closest('li').hasClass('all')){items=items.filter(item=>item.module_tags.includes(subsubsub.data('title')));}
if(m_filter.data('filter-by')){items=items.filter(item=>item[m_filter.data('filter-by')]===m_filter.data('filter-value'));}
if(m_search.length){items=items.filter(function(item){var search_text=item.name+' '+
item.description+' '+
item.long_description+' '+
item.search_terms+' '+
item.module_tags;return-1!==search_text.toLowerCase().indexOf(m_search);});}
if(m_sort.data('sort-by')){const key=m_sort.data('sort-by');const cmpret='reverse'===m_sort.data('sort-order')?-1:1;items.sort((a,b)=>a[key]>b[key]?cmpret:a[key]<b[key]?-cmpret:0);}
items.sort((a,b)=>b.available-a.available);this.set('items',items);return this;},initialize:function(){var items=this.get('items');this.set('raw',items);},});return models;})(window,jQuery,Backbone);