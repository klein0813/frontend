# 斑马线效果

* [linear-gradient](../css3/index.md#linear-gradient)

* 横向斑马线

	```css
		background-image: linear-gradient(#000 50%, #fff 50%);
		background-size: 10% 5%;
	```

* 横向三纹斑马线

	```css
		background-image: linear-gradient(#000 33.33%, #888 33.33%, #888 66.66%, #fff 66.66%);
		background-size: 10% 5%;
	```

* 纵向斑马线

	```css
		background-image: linear-gradient(90deg, #000 50%, #fff 50%);
		background-size: 10% 5%;
	```

* 纵向三纹斑马线

	```css
		background-image: linear-gradient(90deg, #000 33.33%, #888 33.33%, #888 66.66%, #fff 66.66%);
		background-size: 10% 5%;
	```

* 斜向45度斑马线

	```css
		<!-- background-image: linear-gradient(45deg, #000 25%, #fff 25%, #fff 50%, #000 50%, #000 75%, #fff 75%); -->
		background-image: linear-gradient(45deg, #000 25%, #fff 0, #fff 50%, #000 0, #000 75%, #fff 0);
		background-size: 10% 5%;
	```

* 斜向45度三纹斑马线

	```css
		background-image: linear-gradient(45deg, #000 16.666666%, #888 0, #888 33.333333%, #fff 0, #fff 50%, #000 0, #000 66.666666%, #888 0, #888 83.333333%, #fff 0);
		background-size: 5% 5%;
	```

* 鳞片式斑马线

	```css
		background-image: linear-gradient(45deg, #000 50%, #fff 50%);
		background-size: 10% 5%;
	```

* 十字格条纹

	```css
		background-image: linear-gradient(transparent 50%, rgba(255, 255, 255, 0.6) 50%), linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.6) 50%);
		background-size: 50px 50px;
	```
