  
export default function Comment(genimgs){
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div id="carousel" className={classes.gridList} onClick={() => {setImgIndex((imgIndex + 1) % genimgs.length)} }>
			<img src={genimgs[imgIndex].img} alt={genimgs[imgIndex].title} className={classes.gridImg}/>
		</div>
  )
}

/*
  function getStyle(index){ 
    if(index > 0)
      return {display: 'none'};
    return {display: 'block'};
  }

  function nextImg(e) {
    e.preventDefault();
    let nextIndex = (imgIndex + 1) % (post.media.length);
    e.currentTarget.children[imgIndex].style.display = 'none';
    e.currentTarget.children[nextIndex].style.display = 'block';
    setImgIndex(nextIndex);
  }

            <CardMedia className={classes.medias}>
        <div id="carousel" className={classes.gridList} onClick={nextImg}>
          {post.media.map((image, index) => (
            <img src={image.url} alt={image.title} className={classes.gridImg} style={getStyle(index)}/>
          ))}
          <div className={classes.imgNum}>{(imgIndex + 1)+'/'+post.media.length}</div>
        </div>
      </CardMedia>
*/

/*
      <CardMedia className={classes.medias}>
        <div id="carousel" className={classes.gridList} onClick={() => {setImgIndex((imgIndex + 1) % media.length)} }>
          <img src={media[imgIndex].url} alt={media[imgIndex].title} className={classes.gridImg}/>
          <div className={classes.imgNum}>{(imgIndex + 1) + '/' + media.length}</div>
        </div>
      </CardMedia>
*/

/*
  const images = media.map(x => {
    let i = new Image();
    i.src = x.url;
    i.alt = x.title;
    i.loading = "lazy";
    i.className = classes.gridImg;
    return i;
  });

  function getImg(index){
    console.log(images[index]);
    return images[index];
  }
*/