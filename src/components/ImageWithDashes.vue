<template>


        <div class='line-icon'>
            <img src="/logo_placeholder.jpg" alt="" width="60px">    
        </div>



    <!--
    <div class="line-icon">
        <v-img src="/logo_placeholder.jpg" aspect-ratio="1" max-width="100px">
        </v-img>        
    </div>

    <div class="line-icon">
        <v-responsive>
            <v-avatar  size="65" style="text-align: center;">

            </v-avatar>    
        </v-responsive>         
    </div>
    -->
</template>

<script>
export default {
    
}
</script>


<style scoped>

img {
    border-style: none;
    background-color: transparent;
    border-radius: 50%;
}

.line-icon {
    text-align: center;
    width: 100%;
    height: auto;
}

/* Joined both selectors, since were pretty much the same */
.line-icon::before,
.line-icon::after {      
    /* Styles kept */
    width: 20%;
    height: 1px;

    /* Changed to border-top (instead of border) to simulate a line better */
    border-top: 1px solid #999; 

    /* Styles added */
    display: inline-block;
    content: '';
  
    /* Use padding to vertical align the line */
    /* Use padding in em for a responsive icon height */
    padding-bottom: 30px; 
  
    /* Use margins to give the lines some spacement around the icon */
    /* Use margins in % for a responsive spacement */
    margin-left: 10%; 
    margin-right: 10%;
}
</style>
