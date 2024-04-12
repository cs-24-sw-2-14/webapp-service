<script lang="ts">

</script> 


<main>
<!--h1 and p are text-->
<h1>ERROR 404</h1>
<p>Sorry, the page you are looking for could not be found</p>
<p>Here is a button to the main page. You can click it, if you want to </p>
<p>¯\_(ツ)_/¯</p>
<a href="/" title="Still unsure? Well, you have nothing to do here, so might as well go to the main page"> 
    <!--href="/" is used to link to the main page-->
    <!--title="/" is used to make hover text on the button-->
    <button class="button">Main Page</button> <!--It is used to make a button with the text "Main Page"-->
</a>
</main>


<style>
    h1{
        color: darkblue; /*Changes the color of the text in h1*/
        font-weight: bold; /*Makes the text blod*/
        font-size: 30px; /*Is used to make the text the size of 30px*/
    }
    p{
        font-size: 17px; /*Is used to make the text the size of 17px*/ 
        line-height: 1.8; /*Is used to have more space between lines*/ 
    }
    * {
  text-align: center; /*Centers all the text*/
  position:relative; top:40px; /*Is used to have the text be 40px down from the top*/
}
.button {
  border-radius: 50%; /*Makes the edges round*/
  background-color: #ccabf6; /*The color of the button*/
  border: solid blueviolet; /*Makes a border in the color blueviolet*/
  color: black; /*Makes the text color black*/
  padding: 16px 16px; 
  font-size: 20px; /*Is used to make the text the size of 20px*/
  height: 100px; 
  width: 100px; 
}
</style>

