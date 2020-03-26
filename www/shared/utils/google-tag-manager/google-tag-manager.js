const mockIfMissingTrackigId = (fn) => process.env.GTM_TRACKING_ID ? fn : () => {};

export const initGTM = mockIfMissingTrackigId(() => {
    if (document.getElementById(`gtm-${process.env.GTM_TRACKING_ID}`)) {
        return;
    }

    const script = document.createElement('script');

    script.id = `gtm-${process.env.GTM_TRACKING_ID}`;
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GTM_TRACKING_ID}');`;

    document.head.appendChild(script);

    window.dataLayer = [];
});

export const destroyGTM = mockIfMissingTrackigId(() => {
    const script = document.getElementById(`gtm-${process.env.GTM_TRACKING_ID}`);

    script?.parentNode?.removeChild(script);

    delete window.dataLayer;
});

export const dataLayer = mockIfMissingTrackigId((dataLayer) => {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(dataLayer);
});
