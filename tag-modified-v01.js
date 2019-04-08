<script>

    // Variables 
    var url = {{Referrer}};
    var CookieSourceTemp = "";
    var CookieSourceValueOld = "";
    var CookieCampaignTemp = "";
    var CookieCampaignValueOld = "";
    var internalReferrer = false;

    var SourceMedium = {
        bing: "bing / organic", 
        ecosia: "ecosia / organic",
        facebook: "facebook / organic", // HIER NOCHMAL PRÜFEN OB RICHTIG
        duckduckgo: "duckduckgo / organic",
        youtube: "youtube / organic",
        google: "google / organic",
        doubleclick: "google / cpc"
    };

    function createCookie( name, value, days ) {

        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();

        document.cookie = name+"="+value+expires+"; domain=.dz-4.de; path=/";

    }

    // remove protocol (http, ftp, etc.), get domain and remove port
    var domain = ( url.indexOf("://") > -1 ) ? url.split('/')[2] : url.split('/')[0];
    referrer = domain.split(':')[0];


    // Source / Medium Cases
    // Google & Facebook Ads: Source/Medium params should be set so referrer case should not be triggered.
    // The order of if statements is important

    // check if UTMs are present and set cookie content to the source utm 
    if ( {{utm_source}} ) {
        CookieSourceTemp = {{utm_medium}} ? {{utm_source}} + " / " + {{utm_medium}}  : {{utm_source}} + " / (not set)";
    }
 
    // case: only utm_medium and not utm_source is set 
    else if( {{utm_medium}} ) { 
        CookieSourceTemp = "(not set) / " + {{utm_medium}}; 
    } 

    // check if gclid is present and set cookie content to AdWords 
    else if( {{gclid}} ) {  
        CookieSourceTemp =  "google / cpc"; 
    } 

    // check if referrer is present and set cookie content to the referrer 
    else if( referrer ){ 

        // Loop through JS Object and assign Cookie Value with Source / Medium from Object 
        for ( var source in SourceMedium ){
            if ( referrer.includes( source ) ) { 
                CookieSourceTemp = SourceMedium[source];
            }
        }

        // If referral traffic but CookieSourceTemp hasn't been set (i. e. not a predefined traffic source)
        if ( CookieSourceTemp == "" ) CookieSourceTemp = referrer + " / referral"; 

     } 

    // if no params and referrers are set, but it's a LP (because GTM Triggers this tag only on LPs)
    else { 
        CookieSourceTemp = "(direct) / (direct)";
    }


    // Campaign Cases
    if ( {{utm_campaign}} ) { 
        CookieCampaignTemp = {{utm_campaign}}; 
    }
    else if ( {{gclid}} )   { 
        CookieCampaignTemp = "GoogleAdsCampaign"; 
    }
    else                    { 
        CookieCampaignTemp = "(not set)"; 
    }

    // Check if the source / medium cookie is already present and append | 
    // Then, set the cookies.


    if( {{sourcemediumCookie}} ) CookieSourceValueOld = {{sourcemediumCookie}} + " | "; 
    if( {{campaignCookie}} ) CookieCampaignValueOld = {{campaignCookie}} + " | "; 

    createCookie("sourcemedium", CookieSourceValueOld + CookieSourceTemp, 1000); 
    createCookie("campaign", CookieCampaignValueOld + CookieCampaignTemp, 1000); 

</script>

