<template>
    <div class="help">
        <div class="container">
            <div class="buyer-link fr">
                <router-link to="/helpserver/buyer" class="link-a buyer"></router-link>
            </div>
            <div class="seller-link">
                <router-link to="/helpserver/seller" class="link-a seller"></router-link>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
              
            }
        },
        components: {
        
        },
        methods: {
        
        },
        created: function(){
            document.title = "帮助中心"
        },
        mounted: function(){
            $('#footer-common').remove()
        },
    }

</script>
<style>

#app {
    position: absolute;
    width: 100%;
    height: 100%;
}

.help {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/help_bg.png) no-repeat;
    background-size: 100% 100%;
}

.buyer-link,
.seller-link {
    position: absolute;
    width: 26.55rem;
    height: 18.1rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.buyer-link {
    top: 6.6rem;
    right: 1.4rem;
    background-image: url(../../assets/img/help_buyer.png);
}

.seller-link {
    top: 29.3rem;
    left: 1.3rem;
    background-image: url(../../assets/img/help_seller.png);
}

.link-a {
    position: absolute;
    top: .8rem;
    display: inline-block;
    width: 16.3rem;
    height: 16.3rem;
    border-radius: 50%;
}
.link-a.buyer {
    left: .8rem;
}
.link-a.seller {
    right: .9rem;
}
</style>