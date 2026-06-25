/* 記事詳細タイトル整形 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var titles=document.querySelectorAll('.gc_auto_frame_post_item_title h2');
    Array.prototype.forEach.call(titles,function(title){
      if(title.classList.contains('hex-article-title-done'))return;
      title.textContent=title.textContent.replace(/【(?:スタッフブログ|重要なお知らせ)】[ \u00A0　]*/g,'').replace(/\s+/g,' ').trim();
      title.classList.add('hex-article-title-done');
    });
  },0);
});

/* 本文リンク 外部リンクアイコン */
window.addEventListener('load',function(){
  setTimeout(function(){
    var links=document.querySelectorAll('.gc_auto_frame_post_item_body a');
    Array.prototype.forEach.call(links,function(link){
      if(link.classList.contains('hex-link-ready'))return;
      link.classList.add('hex-link-ready');
      var href=link.getAttribute('href')||'';
      if(!href)return;
      if(href.indexOf('http://')!==0&&href.indexOf('https://')!==0)return;
      try{
        var url=new URL(href);
        if(url.hostname===location.hostname)return;
        link.classList.add('hex-link-external');
        link.setAttribute('target','_blank');
        link.setAttribute('rel','noopener');
      }catch(e){}
    });
  },100);
});

/* 一覧ページング整形 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var areas=document.querySelectorAll('.bg_page_button');
    Array.prototype.forEach.call(areas,function(area){
      if(area.classList.contains('hex-pager-done'))return;
      area.classList.add('hex-pager-done');
      var buttons=area.getElementsByClassName('page_button');
      Array.prototype.forEach.call(buttons,function(btn){
        var text=btn.textContent.replace(/\s+/g,' ').trim();
        while(btn.firstChild){
          btn.removeChild(btn.firstChild);
        }
        if(text.indexOf('前のページ')!==-1){
          btn.classList.add('hex-pager-prev');
          var leftIcon=document.createElement('i');
          var leftText=document.createElement('span');
          leftIcon.className='fa-solid fa-arrow-left';
          leftText.textContent='前へ';
          btn.appendChild(leftIcon);
          btn.appendChild(leftText);
        }else if(text.indexOf('次のページ')!==-1){
          btn.classList.add('hex-pager-next');
          var rightText=document.createElement('span');
          var rightIcon=document.createElement('i');
          rightText.textContent='次へ';
          rightIcon.className='fa-solid fa-arrow-right';
          btn.appendChild(rightText);
          btn.appendChild(rightIcon);
        }else{
          btn.textContent=text;
        }
      });
    });
  },100);
});

/* 記事詳細ページング整形 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var pagers=document.querySelectorAll('.gc_auto_frame_post_item_pager_box');
    Array.prototype.forEach.call(pagers,function(pager){
      if(pager.classList.contains('hex-detail-pager-done'))return;
      var prevBox=pager.querySelector('.gc_auto_frame_post_item_pager_prev_box');
      var nextBox=pager.querySelector('.gc_auto_frame_post_item_pager_next_box');
      var separator=pager.querySelector('.gc_auto_frame_post_item_pager_separator');
      if(prevBox){
        var prevTitle=prevBox.querySelector('.gc_auto_frame_post_item_pager_prev_title');
        if(prevTitle&&prevTitle.textContent.trim()){
          hexBuildDetailPagerSide(prevBox,'prev');
        }else{
          prevBox.classList.add('hex-detail-pager-empty');
          while(prevBox.firstChild){
            prevBox.removeChild(prevBox.firstChild);
          }
        }
      }
      if(nextBox){
        var nextTitle=nextBox.querySelector('.gc_auto_frame_post_item_pager_next_title');
        if(nextTitle&&nextTitle.textContent.trim()){
          hexBuildDetailPagerSide(nextBox,'next');
        }else{
          nextBox.classList.add('hex-detail-pager-empty');
          while(nextBox.firstChild){
            nextBox.removeChild(nextBox.firstChild);
          }
        }
      }
      if(separator)separator.textContent='｜';
      pager.classList.add('hex-detail-pager-done');
    });
  },100);
});
function hexBuildDetailPagerSide(box,type){
  var titleEl=box.querySelector(type==='prev'?'.gc_auto_frame_post_item_pager_prev_title':'.gc_auto_frame_post_item_pager_next_title');
  var title=titleEl?hexCleanDetailPagerTitle(titleEl.textContent):'';
  while(box.firstChild){
    box.removeChild(box.firstChild);
  }
  var icon=document.createElement('i');
  var label=document.createElement('span');
  var titleSpan=document.createElement('span');
  titleSpan.className='hex-detail-pager-title';
  titleSpan.textContent=title;
  label.className='hex-detail-pager-label';
  if(type==='prev'){
    icon.className='fa-solid fa-arrow-left';
    label.appendChild(icon);
    label.appendChild(document.createTextNode('前へ'));
    box.classList.add('hex-detail-pager-prev');
    box.appendChild(label);
    box.appendChild(titleSpan);
  }else{
    icon.className='fa-solid fa-arrow-right';
    label.appendChild(document.createTextNode('次へ'));
    label.appendChild(icon);
    box.classList.add('hex-detail-pager-next');
    box.appendChild(titleSpan);
    box.appendChild(label);
  }
}
function hexCleanDetailPagerTitle(text){
  if(!text)return '';
  return text.replace(/【(?:スタッフブログ|重要なお知らせ)】[ \u00A0　]*/g,'').replace(/\s+/g,' ').trim();
}

/* ヘッダーメニュー採用情報URL・アイコン対応 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var recruitUrl='/subsite/recruit/';

    document.querySelectorAll('.headermenu_type8 .menu_sub .menu_inner').forEach(function(el){
      if(!el.querySelector('.hex-menu-icon')){
        var iconSpan=document.createElement('span');
        var icon=document.createElement('i');

        iconSpan.className='hex-menu-icon';
        icon.className='fa-solid fa-arrow-right';

        iconSpan.appendChild(icon);
        el.appendChild(iconSpan);
      }

      if(el.textContent.trim()==='採用情報'){
        el.classList.add('menu-external');

        var externalIcon=el.querySelector('.hex-menu-icon i');
        if(externalIcon){
          externalIcon.className='fa-solid fa-arrow-up-right-from-square';
        }

        el.removeAttribute('onclick');
        el.style.cursor='pointer';

        el.addEventListener('click',function(e){
          e.preventDefault();
          e.stopPropagation();
          window.open(recruitUrl,'_blank','noopener');
        },true);
      }
    });
  },100);
});

/* 共通パーツ */
window.hexIconClass=function(hexType){
  return hexType==='external'?'fa-solid fa-arrow-up-right-from-square':'fa-solid fa-arrow-right';
};
window.hexSetExternal=function(hexAnchor,hexType){
  if(hexType==='external'){
    hexAnchor.target='_blank';
    hexAnchor.rel='noopener';
  }
};
window.hexGetDesignId=function(){
  var params=new URLSearchParams(location.search);
  var designId=params.get('gc_design_set_ID');
  var apiInput=null;
  var api='';
  var match=null;
  if(designId){
    return designId;
  }
  apiInput=document.getElementById('gc_index_url');
  api=apiInput?apiInput.value:'';
  if(api){
    try{
      designId=new URL(api).searchParams.get('gc_design_set_ID');
      if(designId){
        return designId;
      }
    }catch(e){
      match=api.match(/gc_design_set_ID=(\d+)/);
      if(match){
        if(match[1]){
          return match[1];
        }
      }
    }
  }
  match=document.body.innerHTML.match(/gc_design_set_ID=(\d+)/);
  if(match){
    if(match[1]){
      return match[1];
    }
  }
  return '';
};
window.hexBuildUrl=function(hexView){
  var hexType=hexView.dataset.type||'internal';
  var origin=location.origin;
  var host=location.hostname;
  var shortname='';
  var pagetype='';
  var designId='';
  if(hexType==='external'){
    return hexView.dataset.url||'';
  }
  shortname=hexView.dataset.shortname||'';
  pagetype=hexView.dataset.pagetype||'';
  if(!shortname){
    return '';
  }
  if(!pagetype){
    return '';
  }
  if(host==='hokuriku-ex.co.jp'){
    return origin+'/?p='+encodeURIComponent(shortname)+'&k='+encodeURIComponent(pagetype);
  }
  if(host==='02sample28.hopweb.net'){
    designId=window.hexGetDesignId();
    if(!designId){
      return '';
    }
    return origin+'/addon/gartencloud/ajax_gethtml_site_from_db.php?gc_design_set_ID='+encodeURIComponent(designId)+'&shortname='+encodeURIComponent(shortname)+'&page_type='+encodeURIComponent(pagetype);
  }
  return '';
};
window.hexBaseBlock=function(el){
  var current=el;
  while(current){
    if(current.id){
      if(current.id.indexOf('PageLayoutViewList_')===0){
        return current;
      }
    }
    current=current.parentElement;
  }
  return el;
};
window.hexNextBlock=function(el){
  var next=el.nextElementSibling;
  while(next){
    if(next.id){
      if(next.id.indexOf('PageLayoutViewList_')===0){
        return next;
      }
    }
    next=next.nextElementSibling;
  }
  return null;
};
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.hex-button-view').forEach(function(hexView){
    var hexTitle=hexView.dataset.title||'';
    var hexUrl=window.hexBuildUrl(hexView);
    var hexType=hexView.dataset.type||'internal';
    var hexStyle=hexView.dataset.style||'light';
    var hexCol=hexView.dataset.col||'1';
    var hexAlign=hexView.dataset.align||'center';
    var hexWrap=document.createElement('div');
    var hexAnchor=document.createElement('a');
    var hexTitleSpan=document.createElement('span');
    var hexIconSpan=document.createElement('span');
    var hexIcon=document.createElement('i');
    if(!hexTitle)return;
    if(!hexUrl)return;
    hexWrap.className='hex-button-wrap hex-col-'+hexCol+' hex-align-'+hexAlign;
    hexAnchor.className='hex-btn-main '+hexStyle;
    hexAnchor.href=hexUrl;
    window.hexSetExternal(hexAnchor,hexType);
    hexTitleSpan.className='hex-btn-main-title';
    hexTitleSpan.textContent=hexTitle;
    hexIconSpan.className='hex-btn-main-icon';
    hexIcon.className=window.hexIconClass(hexType);
    hexIconSpan.appendChild(hexIcon);
    hexAnchor.appendChild(hexTitleSpan);
    hexAnchor.appendChild(hexIconSpan);
    hexWrap.appendChild(hexAnchor);
    hexView.parentNode.insertBefore(hexWrap,hexView);
    hexView.style.display='none';
  });
  document.querySelectorAll('.hex-link-view').forEach(function(hexView){
    var hexTitle=hexView.dataset.title||'';
    var hexUrl=window.hexBuildUrl(hexView);
    var hexType=hexView.dataset.type||'internal';
    var hexStyle=hexView.dataset.style||'light';
    var hexCol=hexView.dataset.col||'1';
    var hexAlign=hexView.dataset.align||'center';
    var hexWrap=document.createElement('div');
    var hexAnchor=document.createElement('a');
    var hexTitleSpan=document.createElement('span');
    var hexDetailSpan=document.createElement('span');
    var hexIconSpan=document.createElement('span');
    var hexIcon=document.createElement('i');
    if(!hexTitle)return;
    if(!hexUrl)return;
    hexWrap.className='hex-link-wrap hex-col-'+hexCol+' hex-align-'+hexAlign;
    hexAnchor.className='hex-link '+hexStyle;
    hexAnchor.href=hexUrl;
    window.hexSetExternal(hexAnchor,hexType);
    hexTitleSpan.className='hex-link-title';
    hexTitleSpan.textContent=hexTitle;
    hexIconSpan.className='hex-link-icon';
    hexIcon.className=window.hexIconClass(hexType);
    hexIconSpan.appendChild(hexIcon);
    hexAnchor.appendChild(hexTitleSpan);
    if(hexCol==='1'){
      hexDetailSpan.className='hex-link-detail';
      hexDetailSpan.textContent='詳しく見る';
      hexAnchor.appendChild(hexDetailSpan);
    }
    hexAnchor.appendChild(hexIconSpan);
    hexWrap.appendChild(hexAnchor);
    hexView.parentNode.insertBefore(hexWrap,hexView);
    hexView.style.display='none';
  });
});

/* ギャラリー */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.hex-gallery-start').forEach(function(galleryStart){
    var galleryStartBlock=window.hexBaseBlock(galleryStart);
    var galleryEndBlock=window.hexNextBlock(galleryStartBlock);
    var galleryEnd=null;
    while(galleryEndBlock){
      galleryEnd=galleryEndBlock.querySelector('.hex-gallery-end');
      if(galleryEnd)break;
      galleryEndBlock=window.hexNextBlock(galleryEndBlock);
    }
    if(!galleryEndBlock)return;
    var items=[];
    var currentBlock=window.hexNextBlock(galleryStartBlock);
    while(currentBlock){
      var bannerStart=currentBlock.querySelector('.hex-banner-start');
      if(bannerStart){
        var bannerEndBlock=window.hexNextBlock(currentBlock);
        var bannerEnd=null;
        while(bannerEndBlock){
          bannerEnd=bannerEndBlock.querySelector('.hex-banner-end');
          if(bannerEnd)break;
          if(bannerEndBlock===galleryEndBlock)break;
          bannerEndBlock=window.hexNextBlock(bannerEndBlock);
        }
        if(bannerEndBlock){
          var imageBlock=window.hexNextBlock(currentBlock);
          var image=null;
          while(imageBlock){
            if(imageBlock===bannerEndBlock)break;
            image=imageBlock.querySelector('img');
            if(image)break;
            imageBlock=window.hexNextBlock(imageBlock);
          }
          if(image){
            items.push({
              title:bannerStart.dataset.title||'',
              thumbTitle:bannerStart.dataset.thumbTitle||'',
              text:bannerStart.dataset.text||'',
              button:bannerStart.dataset.button||'',
              url:window.hexBuildUrl(bannerStart),
              type:bannerStart.dataset.type||'internal',
              style:bannerStart.dataset.style||'light',
              col:bannerStart.dataset.col||'4',
              image:image.src,
              alt:image.alt||bannerStart.dataset.title||bannerStart.dataset.thumbTitle||''
            });
          }
        }
      }
      if(currentBlock===galleryEndBlock)break;
      currentBlock=window.hexNextBlock(currentBlock);
    }
    if(items.length===0)return;
    var gallery=document.createElement('div');
    var wrap=document.createElement('div');
    var mainSwiper=document.createElement('div');
    var mainWrapper=document.createElement('div');
    var pagination=document.createElement('div');
    var prev=document.createElement('div');
    var next=document.createElement('div');
    var thumbList=document.createElement('div');
    var activeIndex=0;
    gallery.className='hex-gallery';
    if(items.length===1){
      gallery.classList.add('is-single');
    }
    wrap.className='hex-gallery-wrap';
    mainSwiper.className='swiper hex-gallery-main-swiper';
    mainWrapper.className='swiper-wrapper';
    pagination.className='hex-gallery-pagination';
    prev.className='hex-gallery-main-nav hex-gallery-main-prev';
    next.className='hex-gallery-main-nav hex-gallery-main-next';
    thumbList.className='hex-gallery-thumb-list';
    prev.textContent='‹';
    next.textContent='›';
    items.forEach(function(item){
      var slide=document.createElement('div');
      var banner=document.createElement('div');
      var imageBox=document.createElement('div');
      var image=document.createElement('img');
      var overlay=document.createElement('div');
      var inner=document.createElement('div');
      slide.className='swiper-slide';
      banner.className='hex-banner';
      imageBox.className='hex-banner-image';
      overlay.className='hex-banner-overlay';
      inner.className='hex-banner-inner';
      image.src=item.image;
      image.alt=item.alt;
      imageBox.appendChild(image);
      if(item.title){
        var title=document.createElement('h2');
        title.className='hex-banner-title';
        title.textContent=item.title;
        inner.appendChild(title);
      }
      if(item.text){
        var text=document.createElement('div');
        text.className='hex-banner-text';
        text.textContent=item.text;
        inner.appendChild(text);
      }
      if(item.button){
        if(item.url){
          var buttonWrap=document.createElement('div');
          var buttonEl=document.createElement('a');
          var buttonTitle=document.createElement('span');
          var buttonIcon=document.createElement('span');
          var buttonI=document.createElement('i');
          buttonWrap.className='hex-banner-button hex-col-'+item.col;
          buttonEl.className='hex-btn-main '+item.style;
          buttonEl.href=item.url;
          window.hexSetExternal(buttonEl,item.type);
          buttonTitle.className='hex-btn-main-title';
          buttonTitle.textContent=item.button;
          buttonIcon.className='hex-btn-main-icon';
          buttonI.className=window.hexIconClass(item.type);
          buttonIcon.appendChild(buttonI);
          buttonEl.appendChild(buttonTitle);
          buttonEl.appendChild(buttonIcon);
          buttonWrap.appendChild(buttonEl);
          inner.appendChild(buttonWrap);
        }
      }
      banner.appendChild(imageBox);
      if(item.button){
        banner.appendChild(overlay);
      }
      if(item.title||item.text||item.button){
        banner.appendChild(inner);
      }
      slide.appendChild(banner);
      mainWrapper.appendChild(slide);
    });
    mainSwiper.appendChild(mainWrapper);
    mainSwiper.appendChild(prev);
    mainSwiper.appendChild(next);
    mainSwiper.appendChild(pagination);
    wrap.appendChild(mainSwiper);
    if(items.length>1){
      wrap.appendChild(thumbList);
    }
    gallery.appendChild(wrap);
    galleryStartBlock.parentNode.insertBefore(gallery,galleryStartBlock);
    var removeBlock=galleryStartBlock;
    while(removeBlock){
      var nextRemoveBlock=window.hexNextBlock(removeBlock);
      removeBlock.remove();
      if(removeBlock===galleryEndBlock)break;
      removeBlock=nextRemoveBlock;
    }
    if(items.length===1)return;
    if(typeof Swiper==='undefined')return;
    var useLoop=items.length>=2;
    var gallerySwiper=null;
    function normalizeIndex(index){
      var max=items.length;
      var result=index%max;
      if(result<0){
        result=result+max;
      }
      return result;
    }
    function makeThumb(index){
      var realIndex=normalizeIndex(index);
      var item=items[realIndex];
      var thumb=document.createElement('div');
      var thumbImg=document.createElement('img');
      thumb.className='hex-gallery-thumb';
      if(item.thumbTitle){
        thumb.classList.add('has-thumb-title');
      }else{
        thumb.classList.add('no-thumb-title');
      }
      thumb.dataset.index=realIndex;
      thumbImg.src=item.image;
      thumbImg.alt=item.alt;
      thumb.appendChild(thumbImg);
      if(item.thumbTitle){
        var thumbTitle=document.createElement('div');
        thumbTitle.className='hex-gallery-thumb-title';
        thumbTitle.textContent=item.thumbTitle;
        thumb.appendChild(thumbTitle);
      }
      if(realIndex===activeIndex){
        thumb.classList.add('is-active');
      }
      thumb.addEventListener('click',function(){
        if(gallerySwiper){
          if(useLoop){
            gallerySwiper.slideToLoop(realIndex,500);
          }else{
            gallerySwiper.slideTo(realIndex,500);
          }
        }
      });
      return thumb;
    }
    function setActiveThumb(index){
      activeIndex=normalizeIndex(index);
      thumbList.textContent='';
      if(items.length<=4){
        items.forEach(function(item,i){
          thumbList.appendChild(makeThumb(i));
        });
      }else{
        thumbList.appendChild(makeThumb(activeIndex-2));
        thumbList.appendChild(makeThumb(activeIndex-1));
        thumbList.appendChild(makeThumb(activeIndex));
        thumbList.appendChild(makeThumb(activeIndex+1));
        thumbList.appendChild(makeThumb(activeIndex+2));
      }
    }
    gallerySwiper=new Swiper(mainSwiper,{
      slidesPerView:1,
      centeredSlides:false,
      loop:useLoop,
      speed:500,
      grabCursor:true,
      effect:'slide',
      navigation:{
        prevEl:prev,
        nextEl:next
      },
      pagination:{
        el:pagination,
        clickable:true
      },
      on:{
        init:function(){
          setActiveThumb(0);
        },
        slideChange:function(){
          setActiveThumb(this.realIndex);
        }
      }
    });
  });
});

/* バナー */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.hex-banner-start').forEach(function(start){
    var startBlock=window.hexBaseBlock(start);
    var endBlock=window.hexNextBlock(startBlock);
    var end=null;
    while(endBlock){
      end=endBlock.querySelector('.hex-banner-end');
      if(end)break;
      endBlock=window.hexNextBlock(endBlock);
    }
    if(!end)return;
    if(!endBlock)return;
    var imageBlock=window.hexNextBlock(startBlock);
    var image=null;
    while(imageBlock){
      if(imageBlock===endBlock)break;
      image=imageBlock.querySelector('img');
      if(image)break;
      imageBlock=window.hexNextBlock(imageBlock);
    }
    if(!image)return;
    var title=start.dataset.title||'';
    var text=start.dataset.text||'';
    var button=start.dataset.button||'';
    var buttonCol=start.dataset.col||'4';
    var buttonType=start.dataset.type||'internal';
    var buttonStyle=start.dataset.style||'light';
    var bannerUrl=window.hexBuildUrl(start);
    var banner=document.createElement('div');
    var imageBox=document.createElement('div');
    var imageClone=image.cloneNode(true);
    var overlay=document.createElement('div');
    var inner=document.createElement('div');
    banner.className='hex-banner';
    imageBox.className='hex-banner-image';
    overlay.className='hex-banner-overlay';
    inner.className='hex-banner-inner';
    if(bannerUrl){
      if(!button){
        var imageLink=document.createElement('a');
        imageLink.className='hex-banner-image-link';
        imageLink.href=bannerUrl;
        window.hexSetExternal(imageLink,buttonType);
        imageLink.appendChild(imageClone);
        imageBox.appendChild(imageLink);
      }else{
        imageBox.appendChild(imageClone);
      }
    }else{
      imageBox.appendChild(imageClone);
    }
    if(title){
      var titleEl=document.createElement('h2');
      titleEl.className='hex-banner-title';
      titleEl.textContent=title;
      inner.appendChild(titleEl);
    }
    if(text){
      var textEl=document.createElement('div');
      textEl.className='hex-banner-text';
      textEl.textContent=text;
      inner.appendChild(textEl);
    }
    if(button){
      if(bannerUrl){
        var buttonWrap=document.createElement('div');
        var buttonEl=document.createElement('a');
        var buttonTitle=document.createElement('span');
        var buttonIcon=document.createElement('span');
        var buttonI=document.createElement('i');
        buttonWrap.className='hex-banner-button hex-col-'+buttonCol;
        buttonEl.className='hex-btn-main '+buttonStyle;
        buttonEl.href=bannerUrl;
        window.hexSetExternal(buttonEl,buttonType);
        buttonTitle.className='hex-btn-main-title';
        buttonTitle.textContent=button;
        buttonIcon.className='hex-btn-main-icon';
        buttonI.className=window.hexIconClass(buttonType);
        buttonIcon.appendChild(buttonI);
        buttonEl.appendChild(buttonTitle);
        buttonEl.appendChild(buttonIcon);
        buttonWrap.appendChild(buttonEl);
        inner.appendChild(buttonWrap);
      }
    }
    banner.appendChild(imageBox);
    if(button){
      banner.appendChild(overlay);
    }
    if(title||text||button){
      banner.appendChild(inner);
    }
    startBlock.parentNode.insertBefore(banner,startBlock);
    var current=startBlock;
    while(current){
      var next=window.hexNextBlock(current);
      current.remove();
      if(current===endBlock)break;
      current=next;
    }
  });
});

/* 画像グリッド */
document.addEventListener('DOMContentLoaded',function(){
  ['4','5','6'].forEach(function(col){
    document.querySelectorAll('.hex-image-grid'+col+'-start').forEach(function(start){
      var startBlock=window.hexBaseBlock(start);
      var endBlock=window.hexNextBlock(startBlock);
      var end=null;
      while(endBlock){
        end=endBlock.querySelector('.hex-image-grid'+col+'-end');
        if(end)break;
        endBlock=window.hexNextBlock(endBlock);
      }
      if(!end)return;
      if(!endBlock)return;
      var images=[];
      var currentBlock=window.hexNextBlock(startBlock);
      while(currentBlock){
        if(currentBlock===endBlock)break;
        currentBlock.querySelectorAll('img').forEach(function(img){
          images.push({
            img:img,
            link:img.closest('a')
          });
        });
        currentBlock=window.hexNextBlock(currentBlock);
      }
      if(images.length===0)return;
      var grid=document.createElement('div');
      grid.className='hex-image-grid hex-image-grid'+col;
      images.forEach(function(itemData){
        var item=document.createElement('div');
        var clone=itemData.img.cloneNode(true);
        item.className='hex-image-grid-item';
        if(itemData.link){
          var link=itemData.link.cloneNode(false);
          link.appendChild(clone);
          item.appendChild(link);
        }else{
          item.appendChild(clone);
        }
        grid.appendChild(item);
      });
      startBlock.parentNode.insertBefore(grid,startBlock);
      var removeBlock=startBlock;
      while(removeBlock){
        var nextRemoveBlock=window.hexNextBlock(removeBlock);
        removeBlock.remove();
        if(removeBlock===endBlock)break;
        removeBlock=nextRemoveBlock;
      }
    });
  });
});

/* カード */
document.addEventListener('DOMContentLoaded',function(){
  ['1','2','3'].forEach(function(col){
    document.querySelectorAll('.hex-card-grid'+col+'-start').forEach(function(gridStart){
      var gridStartBlock=window.hexBaseBlock(gridStart);
      var gridEndBlock=window.hexNextBlock(gridStartBlock);
      var gridEnd=null;
      while(gridEndBlock){
        gridEnd=gridEndBlock.querySelector('.hex-card-grid'+col+'-end');
        if(gridEnd)break;
        gridEndBlock=window.hexNextBlock(gridEndBlock);
      }
      if(!gridEnd)return;
      if(!gridEndBlock)return;
      var cards=[];
      var currentBlock=window.hexNextBlock(gridStartBlock);
      while(currentBlock){
        var cardStart=currentBlock.querySelector('.hex-card-start');
        if(cardStart){
          var cardEndBlock=window.hexNextBlock(currentBlock);
          var cardEnd=null;
          while(cardEndBlock){
            cardEnd=cardEndBlock.querySelector('.hex-card-end');
            if(cardEnd)break;
            if(cardEndBlock===gridEndBlock)break;
            cardEndBlock=window.hexNextBlock(cardEndBlock);
          }
          if(cardEndBlock){
            var imageBlock=window.hexNextBlock(currentBlock);
            var image=null;
            while(imageBlock){
              if(imageBlock===cardEndBlock)break;
              image=imageBlock.querySelector('img');
              if(image)break;
              imageBlock=window.hexNextBlock(imageBlock);
            }
            if(image){
              cards.push({
                title:cardStart.dataset.title||'',
                text:cardStart.dataset.text||'',
                button:cardStart.dataset.button||'',
                url:window.hexBuildUrl(cardStart),
                type:cardStart.dataset.type||'internal',
                style:cardStart.dataset.style||'light',
                col:cardStart.dataset.col||'4',
                image:image.src,
                alt:image.alt||cardStart.dataset.title||''
              });
            }
          }
        }
        if(currentBlock===gridEndBlock)break;
        currentBlock=window.hexNextBlock(currentBlock);
      }
      if(cards.length===0)return;
      var grid=document.createElement('div');
      grid.className='hex-card-grid hex-card-grid'+col;
      cards.forEach(function(cardData){
        var card=document.createElement('div');
        var imageBox=document.createElement('div');
        var image=document.createElement('img');
        var body=document.createElement('div');
        var head=document.createElement('div');
        var title=document.createElement('h3');
        var text=document.createElement('p');
        card.className='hex-card '+cardData.style;
        imageBox.className='hex-card-image';
        image.src=cardData.image;
        image.alt=cardData.alt;
        body.className='hex-card-body';
        head.className='hex-card-head';
        title.className='hex-card-title';
        text.className='hex-card-text';
        text.textContent=cardData.text;
        imageBox.appendChild(image);
        if(cardData.title){
          if(cardData.url){
            if(!cardData.button){
              var titleLink=document.createElement('a');
              titleLink.className='hex-card-title-link';
              titleLink.href=cardData.url;
              window.hexSetExternal(titleLink,cardData.type);
              titleLink.textContent=cardData.title;
              title.appendChild(titleLink);
            }else{
              title.textContent=cardData.title;
            }
          }else{
            title.textContent=cardData.title;
          }
          head.appendChild(title);
          body.appendChild(head);
        }
        if(cardData.text){
          body.appendChild(text);
        }
        if(cardData.button){
          if(cardData.url){
            var buttonWrap=document.createElement('div');
            var buttonEl=document.createElement('a');
            var buttonTitle=document.createElement('span');
            var buttonIcon=document.createElement('span');
            var buttonI=document.createElement('i');
            buttonWrap.className='hex-card-button hex-col-'+cardData.col;
            buttonEl.className='hex-btn-main '+cardData.style;
            buttonEl.href=cardData.url;
            window.hexSetExternal(buttonEl,cardData.type);
            buttonTitle.className='hex-btn-main-title';
            buttonTitle.textContent=cardData.button;
            buttonIcon.className='hex-btn-main-icon';
            buttonI.className=window.hexIconClass(cardData.type);
            buttonIcon.appendChild(buttonI);
            buttonEl.appendChild(buttonTitle);
            buttonEl.appendChild(buttonIcon);
            buttonWrap.appendChild(buttonEl);
            body.appendChild(buttonWrap);
          }
        }
        card.appendChild(imageBox);
        card.appendChild(body);
        grid.appendChild(card);
      });
      gridStartBlock.parentNode.insertBefore(grid,gridStartBlock);
      var removeBlock=gridStartBlock;
      while(removeBlock){
        var nextRemoveBlock=window.hexNextBlock(removeBlock);
        removeBlock.remove();
        if(removeBlock===gridEndBlock)break;
        removeBlock=nextRemoveBlock;
      }
    });
  });
});

/* お知らせ・ブログ共通リスト整形 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var items=document.querySelectorAll('.gc_auto_frame_post_index_home_box_contents_cell_text_list,.gc_auto_frame_post_index_box_contents_cell_text_list');
    Array.prototype.forEach.call(items,function(item){
      var date=item.querySelector('.gc_auto_frame_post_index_home_box_contents_cell_date_list,.gc_auto_frame_post_index_box_contents_cell_date_list');
      var caption=item.querySelector('.gc_auto_frame_post_index_home_box_contents_cell_caption_list,.gc_auto_frame_post_index_box_contents_cell_caption_list');
      if(caption){
        caption.textContent=caption.textContent.replace(/【(?:スタッフブログ|重要なお知らせ)】[ \u00A0　]*/g,'');
      }
      if(date&&caption&&!item.querySelector('.hex-news-separator')){
        var separator=document.createElement('span');
        separator.className='hex-news-separator';
        separator.textContent='｜';
        item.insertBefore(separator,caption);
      }
      if(!item.querySelector('.hex-news-arrow')){
        var arrow=document.createElement('span');
        var icon=document.createElement('i');
        arrow.className='hex-news-arrow';
        icon.className='fa-solid fa-arrow-right';
        arrow.appendChild(icon);
        item.appendChild(arrow);
      }
    });
    document.body.classList.add('hex-news-list-ready');
  },100);
});

/* トップ お知らせタブ・一覧リンク */
window.addEventListener('load',function(){
  setTimeout(function(){
    var news=document.getElementById('gc_auto_frame_home_4');
    var blog=document.getElementById('gc_auto_frame_home_5');
    if(!news||!blog)return;
    blog.style.display='none';
    if(!document.querySelector('.custom-news-tabs')){
      var tabs=document.createElement('div');
      var tabNews=document.createElement('span');
      var tabBlog=document.createElement('span');
      tabs.className='custom-news-tabs';
      tabNews.className='custom-news-tab is-active';
      tabNews.textContent='重要なお知らせ';
      tabBlog.className='custom-news-tab';
      tabBlog.textContent='スタッフブログ';
      tabs.appendChild(tabNews);
      tabs.appendChild(tabBlog);
      news.insertAdjacentElement('beforebegin',tabs);
      tabNews.addEventListener('click',function(){
        news.style.display='block';
        blog.style.display='none';
        tabNews.classList.add('is-active');
        tabBlog.classList.remove('is-active');
      });
      tabBlog.addEventListener('click',function(){
        news.style.display='none';
        blog.style.display='block';
        tabNews.classList.remove('is-active');
        tabBlog.classList.add('is-active');
      });
    }
    var btnAreas=document.querySelectorAll('.post_index_home_contents .bg_button');
    Array.prototype.forEach.call(btnAreas,function(btnArea){
      if(btnArea.classList.contains('hex-news-link-done'))return;
      btnArea.classList.add('hex-parts-group','hex-align-center','hex-news-link-area','hex-news-link-done');
      while(btnArea.firstChild){
        btnArea.removeChild(btnArea.firstChild);
      }
      var wrap=document.createElement('div');
      var link=document.createElement('div');
      var title=document.createElement('span');
      var iconSpan=document.createElement('span');
      var icon=document.createElement('i');
      wrap.className='hex-link-wrap hex-col-4';
      link.className='hex-link light';
      title.className='hex-link-title';
      title.textContent='一覧を見る';
      iconSpan.className='hex-link-icon';
      icon.className='fa-solid fa-arrow-right';
      iconSpan.appendChild(icon);
      link.appendChild(title);
      link.appendChild(iconSpan);
      wrap.appendChild(link);
      btnArea.appendChild(wrap);
    });
  },500);
});

/* 下層ページタイトル共通 */
document.addEventListener('DOMContentLoaded',function(){
  var enTitle=document.querySelector('.page-title-en');
  var heroTitle=document.querySelector('.gc_auto_frame_page_title h1');
  if(!enTitle||!heroTitle)return;
  heroTitle.appendChild(enTitle);
});

/* 共通フッター レイアウト調整 */
document.addEventListener('DOMContentLoaded',function(){
  setTimeout(function(){
    var areaView=document.getElementById('footer-area-view');
    var footerFrame=document.querySelector('.gc_auto_frame_footer');
    var footerContents=footerFrame?footerFrame.querySelector('.footer_contents'):null;
    var companyText=footerFrame?footerFrame.querySelector('.footer_text'):null;
    var copyright=footerFrame?footerFrame.querySelector('.footer_copyright'):null;
    if(!areaView||!footerFrame||!footerContents||!companyText||!copyright)return;
    if(footerContents.querySelector('.hex-footer-area'))return;
    footerFrame.classList.add('hex-footer-frame');
    if(!companyText.querySelector('.footer-company-name')){
      var companyName=document.createElement('div');
      companyName.className='footer-company-name';
      companyName.textContent='北陸エクステリア株式会社';
      companyText.prepend(companyName);
    }
    areaView.textContent='';
    areaView.appendChild(hexCreateFooterArea());
    areaView.classList.add('hex-footer-area');
    footerContents.insertBefore(areaView,copyright);
  },300);
});

function hexCreateFooterArea(){
  var area=document.createElement('div');
  var title=document.createElement('h3');
  var text=document.createElement('div');
  var p1=document.createElement('p');
  var p2=document.createElement('p');
  var p3=document.createElement('p');
  var p4=document.createElement('p');
  area.className='footer-area';
  text.className='footer-area-text';
  title.textContent='工事対応エリア';
  p1.textContent='■ 石川県全域';
  p2.appendChild(document.createTextNode('金沢市 / 野々市市 / 白山市 / 津幡町 / 内灘町'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('かほく市 / 能美市 / 川北町 / 小松市 / 加賀市'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('羽咋市 / 宝達志水町 / 志賀町 / 中能登町 / 七尾市'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('穴水町 / 能登町 / 輪島市 / 珠洲市'));
  p3.textContent='■ 富山県・福井県の一部';
  p4.textContent='状況によりご相談させていただきます';
  text.appendChild(p1);
  text.appendChild(p2);
  text.appendChild(p3);
  text.appendChild(p4);
  area.appendChild(title);
  area.appendChild(text);
  return area;
}

/* 会社情報ページ レイアウト調整 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var body=document.getElementById('gc_auto_body_company');
    var companyBox=null;
    var historyBlock=null;
    var accessBlock=null;
    var equipmentBlock=null;
    var licenseBlock=null;
    if(!body)return;
    if(body.classList.contains('hex-company-layout-done'))return;
    companyBox=document.querySelector('.publicinfo_company');
    if(!companyBox)return;
    function replaceTextOnly(el,from,to){
      el.childNodes.forEach(function(node){
        if(node.nodeType===3){
          if(node.textContent.trim()===from){
            node.textContent=to;
          }
        }
      });
    }
    function getTitleText(block){
      var title=block.querySelector('.content_title');
      if(!title)return '';
      return title.textContent.trim();
    }
    function makeSectionTitle(text){
      var title=document.createElement('h2');
      title.className='hex-section-title';
      title.textContent=text;
      return title;
    }
    function makeSection(text,type){
      var section=document.createElement('div');
      var title=makeSectionTitle(text);
      section.className='hex-company-section hex-company-section-'+type;
      section.appendChild(title);
      companyBox.appendChild(section);
      return section;
    }
    function getTextLines(textBox){
      var lines=[];
      var current='';
      function pushLine(){
        var value=current.trim();
        if(value){
          lines.push(value);
        }
        current='';
      }
      function walk(node){
        if(node.nodeType===3){
          current+=node.textContent;
        }
        if(node.nodeType===1){
          if(node.tagName==='BR'){
            pushLine();
          }else{
            node.childNodes.forEach(function(child){
              walk(child);
            });
            if(node.tagName==='DIV'||node.tagName==='P'){
              pushLine();
            }
          }
        }
      }
      textBox.childNodes.forEach(function(node){
        walk(node);
      });
      pushLine();
      return lines;
    }
    function buildPairLayout(block){
      var textBox=block.querySelector('.content_text');
      var lines=[];
      var pairs=[];
      var grid=document.createElement('div');
      if(!textBox)return;
      lines=getTextLines(textBox);
      lines.forEach(function(line){
        var value=line.trim();
        var last=null;
        if(!value)return;
        if(value==='｜'||value==='|')return;
        if(value.indexOf('｜')!==-1||value.indexOf('|')!==-1){
          var parts=value.split(/[｜|]/);
          if(parts.length>1){
            pairs.push({name:parts[0].trim(),count:parts.slice(1).join('').trim()});
          }
        }else{
          if(pairs.length){
            last=pairs[pairs.length-1];
            if(last.name){
              if(!last.count){
                last.count=value;
              }else{
                pairs.push({name:value,count:''});
              }
            }
          }else{
            pairs.push({name:value,count:''});
          }
        }
      });
      grid.className='hex-company-pair-grid';
      pairs.forEach(function(pair){
        var item=document.createElement('div');
        var name=document.createElement('div');
        var count=document.createElement('div');
        if(!pair.name)return;
        item.className='hex-company-pair-item';
        name.className='hex-company-pair-name';
        count.className='hex-company-pair-count';
        name.textContent=pair.name;
        count.textContent=pair.count;
        item.appendChild(name);
        item.appendChild(count);
        grid.appendChild(item);
      });
      textBox.textContent='';
      textBox.appendChild(grid);
    }
    function getHistoryLines(block){
      var textBox=block.querySelector('.content_text');
      if(!textBox)return [];
      return getTextLines(textBox);
    }
    function makeHistoryRow(line){
      var row=document.createElement('div');
      var title=document.createElement('div');
      var text=document.createElement('div');
      var match=line.match(/^(.+?月)[\s　]+(.+)$/);
      row.className='content textcolor_black bordercolor_black';
      title.className='content_title';
      text.className='content_text';
      if(match){
        title.textContent=match[1];
        text.textContent=match[2];
      }else{
        title.textContent=line;
        text.textContent='';
      }
      row.appendChild(title);
      row.appendChild(text);
      return row;
    }
    companyBox.querySelectorAll('h2.title').forEach(function(title){
      title.classList.add('hex-section-title');
      if(title.textContent.trim()==='会社情報'){
        title.textContent='基本情報';
        if(title.nextElementSibling){
          title.nextElementSibling.classList.add('hex-company-main-first-line');
        }
      }
    });
    companyBox.querySelectorAll('.content_title').forEach(function(title){
      var text=title.textContent.trim();
      if(text==='商号'){
        replaceTextOnly(title,'商号','会社名');
      }
      if(text==='取引先'){
        replaceTextOnly(title,'取引先','役員');
      }
      if(text==='取扱いメーカー'){
        replaceTextOnly(title,'取扱いメーカー','創業・設立');
      }
      if(text==='保険'){
        replaceTextOnly(title,'保険','事業所・資材倉庫');
      }
      if(text==='取引先銀行'){
        replaceTextOnly(title,'取引先銀行','主要取引銀行');
      }
      if(text==='加盟団体'){
        replaceTextOnly(title,'加盟団体','設備');
      }
      if(text==='顧問弁護士'){
        replaceTextOnly(title,'顧問弁護士','資格');
      }
    });
    companyBox.querySelectorAll('.content').forEach(function(block){
      var text=getTitleText(block);
      if(text==='沿革'){
        historyBlock=block;
      }
      if(text==='アクセス'){
        accessBlock=block;
      }
      if(text==='設備'){
        equipmentBlock=block;
      }
      if(text==='資格'){
        licenseBlock=block;
      }
    });
    var order=['会社名','代表者','役員','創業・設立','資本金','従業員数','所在地','事業所・資材倉庫','電話番号','FAX','営業時間','定休日','主要取引銀行','適格事業者登録番号','事業内容','許認可','施工エリア'];
    var mainBlocks=[];
    var firstTitle=companyBox.querySelector('h2.hex-section-title');
    var afterNode=firstTitle;
    order.forEach(function(label){
      companyBox.querySelectorAll('.content').forEach(function(block){
        if(getTitleText(block)===label){
          mainBlocks.push(block);
        }
      });
    });
    if(firstTitle){
      if(mainBlocks.length){
        mainBlocks.forEach(function(block){
          afterNode.parentNode.insertBefore(block,afterNode.nextSibling);
          afterNode=block;
        });
      }
    }
    if(equipmentBlock||licenseBlock){
      var infoSection=makeSection('設備・資格情報','info');
      if(equipmentBlock){
        equipmentBlock.remove();
        buildPairLayout(equipmentBlock);
        infoSection.appendChild(equipmentBlock);
      }
      if(licenseBlock){
        licenseBlock.remove();
        buildPairLayout(licenseBlock);
        infoSection.appendChild(licenseBlock);
      }
    }
    if(historyBlock){
      var historyLines=getHistoryLines(historyBlock);
      var historySection=makeSection('沿革','history');
      historyBlock.remove();
      historyLines.forEach(function(line){
        historySection.appendChild(makeHistoryRow(line));
      });
    }
    if(accessBlock){
      var accessSection=makeSection('アクセス','access');
      accessBlock.remove();
      accessSection.appendChild(accessBlock);
      var oldTitle=accessBlock.querySelector('.content_title');
      if(oldTitle){
        oldTitle.style.display='none';
      }
      var mapLink=accessBlock.querySelector('a');
      if(mapLink){
        var mapWrap=document.createElement('div');
        var titleSpan=document.createElement('span');
        var iconSpan=document.createElement('span');
        var icon=document.createElement('i');
        mapWrap.className='hex-link-wrap hex-company-map-link';
        mapLink.className='hex-link light';
        mapLink.target='_blank';
        mapLink.rel='noopener';
        mapLink.textContent='';
        titleSpan.className='hex-link-title';
        titleSpan.textContent='Googleマップで見る';
        iconSpan.className='hex-link-icon';
        icon.className='fa-solid fa-arrow-up-right-from-square';
        iconSpan.appendChild(icon);
        mapLink.appendChild(titleSpan);
        mapLink.appendChild(iconSpan);
        mapLink.parentNode.insertBefore(mapWrap,mapLink);
        mapWrap.appendChild(mapLink);
      }
    }
    body.classList.add('hex-company-layout-done');
  },100);
});

/* スタッフ紹介 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var frame=document.getElementById('gc_auto_frame_staff_2');
    if(!frame)return;
    var original=frame.querySelector('.bg_publicinfo_staff');
    if(!original)return;
    var staffNodes=Array.prototype.slice.call(original.querySelectorAll('.staff_content'));
    if(staffNodes.length<2)return;
    if(frame.querySelector('.hex-staff-wrap'))return;
    var sample=staffNodes[0];
    var noImage=getStaffImage(sample);
    if(!noImage)noImage='';
    var groups=[];
    var groupMap={};
    staffNodes.slice(1).forEach(function(staff){
      var data=getStaffData(staff,noImage);
      if(!data.name)return;
      if(!data.department)return;
      if(!groupMap[data.department]){
        groupMap[data.department]={ name:data.department, members:[] };
        groups.push(groupMap[data.department]);
      }
      groupMap[data.department].members.push(data);
    });
    if(!groups.length)return;
    var wrap=document.createElement('div');
    wrap.className='hex-staff-wrap';
    groups.forEach(function(group){
      var section=document.createElement('section');
      section.className='hex-staff-section';
      var title=document.createElement('h3');
      title.className='hex-section-subtitle';
      title.textContent=group.name;
      var grid=document.createElement('div');
      grid.className='hex-staff-grid';
      group.members.forEach(function(member){
        grid.appendChild(createStaffCard(member));
      });
      section.appendChild(title);
      section.appendChild(grid);
      wrap.appendChild(section);
    });
    original.insertAdjacentElement('afterend',wrap);
    hexInitStaffCards(wrap);
  },200);
});
function getStaffImage(staff){
  var image='';
  var nodes=staff.querySelectorAll('*');
  Array.prototype.forEach.call(nodes,function(node){
    if(image)return;
    var style=window.getComputedStyle(node);
    if(!style)return;
    if(!style.backgroundImage)return;
    if(style.backgroundImage==='none')return;
    image=style.backgroundImage;
  });
  return image;
}
function getText(root,selector){
  var el=root.querySelector(selector);
  if(!el)return '';
  return el.textContent.replace(/\s+/g,' ').trim();
}
function getHtml(root,selector){
  var el=root.querySelector(selector);
  if(!el)return '';
  return el.innerHTML.trim();
}
function removeStartLabel(text,label){
  if(!text)return '';
  if(!label)return text.trim();
  if(text.indexOf(label)===0)text=text.substring(label.length);
  return text.replace(/^\s+/,'').trim();
}
function getCleanText(root,selector,label){
  var text=getText(root,selector);
  return removeStartLabel(text,label);
}
function getCleanHtml(root,selector,label){
  var html=getHtml(root,selector);
  return removeStartLabel(html,label);
}
function getStaffData(staff,noImage){
  var name=getText(staff,'.contents_staff_name');
  var rawDepartment=getText(staff,'.contents_staff_department');
  var strength=getCleanHtml(staff,'.contents_staff_post','役割・資格');
  var joined=getCleanText(staff,'.contents_staff_hobby','趣味・特技');
  var license=getHtml(staff,'.contents_staff_message');
  var parts=rawDepartment.split('|').map(function(v){ return v.trim(); });
  var department=parts[0]||'';
  var position=parts[1]||'';
  var attribute=parts[2]||'';
  var leader=parts[3]||'';
  var ownImage=getStaffImage(staff);
  var image=ownImage;
  var isNoImage=false;
  if(!image){
    image=noImage;
    isNoImage=true;
  }
  return {
    name:name,
    department:department,
    position:position,
    attribute:attribute,
    isLeader:leader==='代表',
    strength:strength,
    joined:joined,
    license:license,
    image:image,
    isNoImage:isNoImage
  };
}
function createStaffCard(data){
  var card=document.createElement('article');
  card.className=data.isLeader?'hex-staff-card is-leader':'hex-staff-card';
  if(data.isNoImage)card.classList.add('is-noimage');
  var photo=document.createElement('div');
  photo.className='hex-staff-photo';
  if(data.image)photo.style.backgroundImage=data.image;
  var body=document.createElement('div');
  body.className='hex-staff-body';
  var deptTag=document.createElement('p');
  deptTag.className='hex-staff-dept-tag';
  deptTag.textContent='['+data.department+']';
  var head=document.createElement('div');
  head.className='hex-staff-head';
  var name=document.createElement('div');
  name.className='hex-staff-name';
  var roleText=createRoleText(data.position,data.attribute);
  name.textContent=roleText?data.name+' ['+roleText+']':data.name;
  var toggle=document.createElement('button');
  toggle.className='hex-staff-toggle';
  toggle.type='button';
  toggle.setAttribute('aria-expanded','false');
  toggle.textContent='+';
  head.appendChild(name);
  head.appendChild(toggle);
  var joined=document.createElement('p');
  joined.className='hex-staff-joined';
  joined.textContent=data.joined;
  body.appendChild(deptTag);
  if(data.isLeader){
    if(data.strength){
      var leaderTop=document.createElement('div');
      leaderTop.className='hex-staff-detail hex-staff-leader-top';
      leaderTop.appendChild(createDepartmentTextBlock(data.strength));
      leaderTop.appendChild(createDivider());
      body.appendChild(leaderTop);
    }
    body.appendChild(head);
    if(data.joined)body.appendChild(joined);
    if(data.license){
      var leaderBottom=document.createElement('div');
      leaderBottom.className='hex-staff-detail hex-staff-leader-bottom';
      leaderBottom.appendChild(createDetailBlock('[保有資格]',data.license));
      body.appendChild(leaderBottom);
    }
  }else{
    body.appendChild(head);
    if(data.joined)body.appendChild(joined);
    if(data.strength||data.license){
      var detail=document.createElement('div');
      detail.className='hex-staff-detail';
      if(data.strength)detail.appendChild(createTextBlock(data.strength));
      if(data.strength&&data.license)detail.appendChild(createDivider());
      if(data.license)detail.appendChild(createDetailBlock('[保有資格]',data.license));
      body.appendChild(detail);
    }
  }
  card.appendChild(photo);
  card.appendChild(body);
  return card;
}
function createRoleText(position,attribute){
  var arr=[];
  if(position)arr.push(position);
  if(attribute)arr.push(attribute);
  return arr.join('・');
}
function createDivider(){
  var divider=document.createElement('div');
  divider.className='hex-staff-divider';
  return divider;
}
function createTextBlock(bodyHtml){
  var block=document.createElement('div');
  block.className='hex-staff-detail-block';
  var text=document.createElement('p');
  text.className='hex-staff-detail-text';
  text.innerHTML=bodyHtml;
  block.appendChild(text);
  return block;
}
function createDepartmentTextBlock(bodyHtml){
  var block=document.createElement('div');
  block.className='hex-staff-detail-block';
  var text=document.createElement('p');
  text.className='hex-staff-department-text';
  text.innerHTML=bodyHtml;
  block.appendChild(text);
  return block;
}
function createDetailBlock(titleText,bodyHtml){
  var block=document.createElement('div');
  block.className='hex-staff-detail-block';
  var title=document.createElement('p');
  title.className='hex-staff-detail-title';
  title.textContent=titleText;
  var text=document.createElement('p');
  text.className='hex-staff-detail-text';
  text.innerHTML=bodyHtml;
  block.appendChild(title);
  block.appendChild(text);
  return block;
}
function hexInitStaffCards(scope){
  hexResetStaffToggle(scope);
  hexInitStaffToggle(scope);
}
function hexResetStaffToggle(scope){
  var cards=scope.getElementsByClassName('hex-staff-card');
  var isSp=window.innerWidth<=768;
  for(var i=0;i<cards.length;i++){
    cards[i].className=cards[i].className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
    var details=cards[i].getElementsByClassName('hex-staff-detail');
    var toggle=cards[i].getElementsByClassName('hex-staff-toggle')[0];
    var isLeader=(' '+cards[i].className+' ').indexOf(' is-leader ')!==-1;
    for(var d=0;d<details.length;d++){
      if(isLeader&&!isSp){
        details[d].style.display='block';
      }else{
        details[d].style.display='none';
      }
    }
    if(toggle){
      toggle.setAttribute('aria-expanded','false');
      toggle.textContent='+';
      if(isLeader&&!isSp){
        toggle.style.display='none';
      }else{
        toggle.style.display='';
      }
    }
  }
}
function hexInitStaffToggle(scope){
  var buttons=scope.getElementsByClassName('hex-staff-toggle');
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
      var card=hexClosestByClass(this,'hex-staff-card');
      if(!card)return;
      var details=card.getElementsByClassName('hex-staff-detail');
      var isOpen=(' '+card.className+' ').indexOf(' is-open ')!==-1;
      var wrap=hexClosestByClass(card,'hex-staff-wrap');
      if(wrap){
        var cards=wrap.getElementsByClassName('hex-staff-card');
        for(var j=0;j<cards.length;j++){
          if(cards[j]!==card){
            cards[j].className=cards[j].className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
            var btn=cards[j].getElementsByClassName('hex-staff-toggle')[0];
            var dtls=cards[j].getElementsByClassName('hex-staff-detail');
            var leader=(' '+cards[j].className+' ').indexOf(' is-leader ')!==-1;
            var sp=window.innerWidth<=768;
            if(btn){
              btn.textContent='+';
              btn.setAttribute('aria-expanded','false');
            }
            for(var k=0;k<dtls.length;k++){
              if(leader&&!sp){
                dtls[k].style.display='block';
              }else{
                dtls[k].style.display='none';
              }
            }
          }
        }
      }
      if(isOpen){
        card.className=card.className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
        this.setAttribute('aria-expanded','false');
        this.textContent='+';
        for(var a=0;a<details.length;a++){
          details[a].style.display='none';
        }
      }else{
        card.className=card.className+' is-open';
        this.setAttribute('aria-expanded','true');
        this.textContent='?';
        for(var b=0;b<details.length;b++){
          details[b].style.display='block';
        }
      }
    };
  }
}
function hexClosestByClass(el,className){
  while(el&&el.nodeType===1){
    if((' '+el.className+' ').indexOf(' '+className+' ')!==-1)return el;
    el=el.parentNode;
  }
  return null;
}
window.addEventListener('resize',function(){
  var wraps=document.getElementsByClassName('hex-staff-wrap');
  for(var i=0;i<wraps.length;i++){
    hexResetStaffToggle(wraps[i]);
  }
});

/* 私たちについて スタッフ紹介読込 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var target=document.getElementById('hex-staff-area');
    if(!target)return;
    var staffShortname='staff';
    var staffPageType='staff';
    var staffUrl=hexBuildStaffPageUrl(staffShortname,staffPageType);
    if(!staffUrl)return;
    var iframe=document.createElement('iframe');
    iframe.className='hex-staff-loader-iframe';
    iframe.src=staffUrl;
    iframe.setAttribute('loading','eager');
    iframe.setAttribute('scrolling','no');
    iframe.style.position='absolute';
    iframe.style.left='-9999px';
    iframe.style.top='0';
    iframe.style.width='1200px';
    iframe.style.height='1px';
    iframe.style.border='0';
    iframe.style.visibility='hidden';
    iframe.addEventListener('load',function(){
      hexWaitStaffWrap(iframe,target);
    });
    document.body.appendChild(iframe);
  },200);
});
function hexWaitStaffWrap(iframe,target){
  var count=0;
  var max=20;
  var timer=setInterval(function(){
    count++;
    try{
      var doc=iframe.contentDocument||iframe.contentWindow.document;
      if(!doc)return;
      var staff=doc.querySelector('.hex-staff-wrap');
      if(staff){
        clearInterval(timer);
        while(target.firstChild){
          target.removeChild(target.firstChild);
        }
        target.appendChild(staff.cloneNode(true));
        hexResetStaffToggle(target);
        hexInitStaffToggle(target);
        if(iframe.parentNode){
          iframe.parentNode.removeChild(iframe);
        }
        return;
      }
      if(count>=max){
        clearInterval(timer);
        if(iframe.parentNode){
          iframe.parentNode.removeChild(iframe);
        }
      }
    }catch(e){
      clearInterval(timer);
      if(iframe.parentNode){
        iframe.parentNode.removeChild(iframe);
      }
    }
  },200);
}
function hexResetStaffToggle(scope){
  var cards=scope.getElementsByClassName('hex-staff-card');
  var isSp=window.innerWidth<=768;
  for(var i=0;i<cards.length;i++){
    cards[i].className=cards[i].className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
    var details=cards[i].getElementsByClassName('hex-staff-detail');
    var toggle=cards[i].getElementsByClassName('hex-staff-toggle')[0];
    var isLeader=(' '+cards[i].className+' ').indexOf(' is-leader ')!==-1;
    for(var d=0;d<details.length;d++){
      if(isLeader&&!isSp){
        details[d].style.display='block';
      }else{
        details[d].style.display='none';
      }
    }
    if(toggle){
      toggle.setAttribute('aria-expanded','false');
      toggle.textContent='+';
      if(isLeader&&!isSp){
        toggle.style.display='none';
      }else{
        toggle.style.display='';
      }
    }
  }
}
function hexInitStaffToggle(scope){
  var buttons=scope.getElementsByClassName('hex-staff-toggle');
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
      var card=hexClosestByClass(this,'hex-staff-card');
      if(!card)return;
      var details=card.getElementsByClassName('hex-staff-detail');
      var isOpen=(' '+card.className+' ').indexOf(' is-open ')!==-1;
      var wrap=hexClosestByClass(card,'hex-staff-wrap');
      if(wrap){
        var cards=wrap.getElementsByClassName('hex-staff-card');
        for(var j=0;j<cards.length;j++){
          if(cards[j]!==card){
            cards[j].className=cards[j].className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
            var btn=cards[j].getElementsByClassName('hex-staff-toggle')[0];
            var dtls=cards[j].getElementsByClassName('hex-staff-detail');
            var leader=(' '+cards[j].className+' ').indexOf(' is-leader ')!==-1;
            var sp=window.innerWidth<=768;
            if(btn){
              btn.textContent='+';
              btn.setAttribute('aria-expanded','false');
            }
            for(var k=0;k<dtls.length;k++){
              if(leader&&!sp){
                dtls[k].style.display='block';
              }else{
                dtls[k].style.display='none';
              }
            }
          }
        }
      }
      if(isOpen){
        card.className=card.className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
        this.setAttribute('aria-expanded','false');
        this.textContent='+';
        for(var a=0;a<details.length;a++){
          details[a].style.display='none';
        }
      }else{
        card.className=card.className+' is-open';
        this.setAttribute('aria-expanded','true');
        this.textContent='?';
        for(var b=0;b<details.length;b++){
          details[b].style.display='block';
        }
      }
    };
  }
}
function hexClosestByClass(el,className){
  while(el&&el.nodeType===1){
    if((' '+el.className+' ').indexOf(' '+className+' ')!==-1)return el;
    el=el.parentNode;
  }
  return null;
}
function hexBuildStaffPageUrl(shortname,pageType){
  var host=location.hostname;
  var designSetId=hexGetDesignSetId();
  if(host.indexOf('02sample28.hopweb.net')!==-1){
    if(!designSetId)return '';
    return '/addon/gartencloud/ajax_gethtml_site_from_db.php?gc_design_set_ID='+encodeURIComponent(designSetId)+'&shortname='+encodeURIComponent(shortname)+'&page_type='+encodeURIComponent(pageType);
  }
  return '/?p='+encodeURIComponent(shortname)+'&k='+encodeURIComponent(pageType);
}
function hexGetDesignSetId(){
  var match=location.href.match(/[?&]gc_design_set_ID=([^&]+)/);
  if(match&&match[1])return decodeURIComponent(match[1]);
  var links=document.getElementsByTagName('a');
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute('href')||'';
    if(href.indexOf('gc_design_set_ID=')===-1)continue;
    var m=href.match(/[?&]gc_design_set_ID=([^&]+)/);
    if(m&&m[1])return decodeURIComponent(m[1]);
  }
  return '';
}
window.addEventListener('resize',function(){
  var areas=document.querySelectorAll('#hex-staff-area,.hex-staff-wrap');
  for(var i=0;i<areas.length;i++){
    hexResetStaffToggle(areas[i]);
  }
});

/* よくある質問 */
window.addEventListener('load',function(){
  setTimeout(function(){
    var faq=document.querySelector('.publicinfo_qanda');
    if(!faq)return;
    var items=faq.querySelectorAll('.qanda_content');
    items.forEach(function(item){
      var inputs=item.getElementsByTagName('input');
      var answers=item.getElementsByClassName('bg_answer_qa');
      if(!inputs.length)return;
      if(!answers.length)return;
      var input=inputs[0];
      var answer=answers[0];
      answer.style.overflow='hidden';
      answer.style.transition='height .75s cubic-bezier(.22,1,.36,1),opacity .55s ease';
      function updateArrow(){
        if(input.checked){
          item.classList.add('is-open');
        }else{
          item.classList.remove('is-open');
        }
      }
      function openAnswer(){
        updateArrow();
        answer.style.height='0px';
        answer.style.opacity='0';
        requestAnimationFrame(function(){
          answer.style.height=answer.scrollHeight+'px';
          answer.style.opacity='1';
        });
      }
      function closeAnswer(){
        updateArrow();
        answer.style.height='0px';
        answer.style.opacity='0';
      }
      if(input.checked){
        item.classList.add('is-open');
        answer.style.height='auto';
        answer.style.opacity='1';
      }else{
        item.classList.remove('is-open');
        answer.style.height='0px';
        answer.style.opacity='0';
      }
      input.addEventListener('change',function(){
        if(input.checked){
          openAnswer();
        }else{
          closeAnswer();
        }
      });
      answer.addEventListener('transitionend',function(e){
        if(e.propertyName!=='height')return;
        if(input.checked){
          answer.style.height='auto';
        }
      });
    });
  },100);
});