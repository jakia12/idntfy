// Funktion, um das GIF neu zu starten
function reloadGif(gifElement) {
    if (gifElement) {
        const src = gifElement.src.split('?')[0];
        gifElement.src = src + '?time=' + new Date().getTime();
    } else {
        console.error('Das GIF-Element wurde nicht gefunden.');
    }
}

// Function to copy the visible address
function copyVisibleAddress(event) {
    // Find the closest blockchain view
    const visibleView = event.target.closest('.blockchainView');

    if (!visibleView) {
        console.error('No blockchain view found.');
        return;
    }

    // Find the address element inside this view
    const addressElement = visibleView.querySelector('.address-to-copy');
    const notification = visibleView.querySelector('.notification');

    if (addressElement && notification) {
        const address = addressElement.textContent;
        navigator.clipboard.writeText(address)
            .then(() => {
                console.log(`Copied address: ${address}`);
                notification.textContent = 'Address Copied';
            })
            .catch((error) => {
                console.error('Error copying address:', error);
                notification.textContent = 'Failed to Copy';
            })
            .finally(() => {
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            });
    } else {
        console.error('Address or notification element not found.');
    }
}

// Funktion zur Behandlung der Blockchain-Auswahl
function changeChain(chain, element) {
        // Dropdown-Menü schließen
        const dropdownContent = document.getElementById("chainDropdown");
        if (dropdownContent) {
            dropdownContent.classList.toggle("open");
        
    
        }
        
    // Alle Ansichten ausblenden
    const blockchainViews = document.getElementsByClassName("blockchainView");
    Array.from(blockchainViews).forEach(view => {
        view.style.display = "none";
    });

    // Ansicht für die ausgewählte Blockchain anzeigen
    const selectedView = document.getElementById(chain + "View");
    if (selectedView) {
        selectedView.style.display = "block";
    }

    // Den Namen der ausgewählten Blockchain und das Logo aktualisieren
    const chainName = chain.charAt(0).toUpperCase() + chain.slice(1); // Ersten Buchstaben groß schreiben
    const selectedChainBtn = document.getElementById("selectedChain");

    // SVG-Code für verschiedene Blockchains
    let svgCode = '';
    switch (chain) {
        case 'ethereum':
            svgCode = `<svg id="${chain}" width="24" height="24" style="margin-right: 12px; width: 24px; height: 24px;">
            <rect rx="6" fill="#F9F9F9" width="24" height="24"></rect><rect rx="6" fill="#0052FF33" width="24" height="24"></rect><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4817 4.29043L7.08715 11.516C6.91315 11.8019 7.00806 12.1725 7.29743 12.3421L11.692 14.9163C11.8818 15.0279 12.1182 15.0279 12.308 14.9163L16.7026 12.3421C16.9919 12.1725 17.0869 11.8019 16.9129 11.516L12.5192 4.29043C12.2838 3.90319 11.7171 3.90319 11.4817 4.29043Z" fill="#6B8AFF"></path><path d="M15.7897 15.0102C15.7897 14.999 15.7878 14.9888 15.7869 14.9786C15.785 14.9684 15.7831 14.9582 15.7813 14.948C15.7785 14.9359 15.7748 14.9248 15.7711 14.9127C15.7683 14.9035 15.7655 14.8951 15.7608 14.8868C15.7552 14.8738 15.7478 14.8608 15.7404 14.8487C15.7366 14.8422 15.7329 14.8348 15.7283 14.8283C15.7153 14.8098 15.7013 14.7912 15.6846 14.7754C15.6678 14.7597 15.6502 14.7448 15.6316 14.7318C15.625 14.7272 15.6185 14.7244 15.6111 14.7198C15.599 14.7123 15.586 14.7049 15.573 14.6993C15.5646 14.6956 15.5553 14.6928 15.546 14.6891C15.5348 14.6854 15.5228 14.6817 15.5107 14.6789C15.5004 14.6761 15.4902 14.6743 15.48 14.6734C15.4697 14.6715 15.4595 14.6706 15.4484 14.6706C15.4363 14.6706 15.4251 14.6697 15.413 14.6706C15.4046 14.6706 15.3963 14.6724 15.387 14.6734C15.374 14.6752 15.3609 14.6761 15.3479 14.6789C15.3442 14.6789 15.3405 14.6817 15.3368 14.6826C15.2968 14.6928 15.2586 14.7086 15.2233 14.7318L12.3311 16.4363C12.1265 16.5569 11.8735 16.5569 11.6689 16.4363L8.77673 14.7318C8.74139 14.7086 8.70326 14.6928 8.66327 14.6826C8.65955 14.6817 8.65583 14.6799 8.65211 14.6789C8.63909 14.6761 8.62607 14.6752 8.61305 14.6734C8.60468 14.6724 8.59631 14.6715 8.58701 14.6706C8.57492 14.6706 8.56376 14.6706 8.55167 14.6706C8.54144 14.6706 8.53029 14.6724 8.52006 14.6734C8.50983 14.6752 8.4996 14.6771 8.48937 14.6789C8.47728 14.6817 8.46612 14.6854 8.45403 14.6891C8.44473 14.6919 8.43636 14.6956 8.42706 14.6993C8.41404 14.7049 8.40102 14.7123 8.38893 14.7198C8.38242 14.7235 8.37498 14.7272 8.36847 14.7318C8.34987 14.7448 8.33127 14.7587 8.31546 14.7754C8.29965 14.7921 8.28477 14.8098 8.27175 14.8283C8.2671 14.8348 8.26431 14.8413 8.25966 14.8487C8.25222 14.8617 8.24478 14.8738 8.2392 14.8868C8.23548 14.8951 8.23269 14.9044 8.22897 14.9127C8.22525 14.9248 8.22153 14.9359 8.21874 14.948C8.21595 14.9582 8.21409 14.9684 8.21316 14.9786C8.2113 14.9888 8.21037 15 8.21037 15.0102C8.21037 15.0213 8.20944 15.0334 8.21037 15.0445C8.21037 15.0538 8.21223 15.0621 8.21316 15.0714C8.21502 15.0844 8.21595 15.0974 8.21874 15.1095C8.21967 15.115 8.22153 15.1197 8.22339 15.1243C8.23455 15.167 8.25315 15.2069 8.28012 15.244L11.4681 19.7265C11.7275 20.0911 12.2706 20.0911 12.5301 19.7265L15.718 15.244C15.745 15.2069 15.7636 15.167 15.7748 15.1243C15.7757 15.1197 15.7785 15.1141 15.7794 15.1095C15.7822 15.0965 15.7831 15.0844 15.785 15.0714C15.7859 15.0621 15.7869 15.0538 15.7878 15.0445C15.7878 15.0334 15.7878 15.0213 15.7878 15.0102H15.7897Z" fill="#6B8AFF"></path></svg>
            </svg>`;
            break;
        case 'base':
            svgCode = `<svg id="${chain}" width="24" height="24" style="margin-right: 12px; width: 20px; height: 20px;"><rect rx="6" fill="#F9F9F9" width="24" height="24"></rect><rect rx="6" fill="#0052FF33" width="24" height="24"></rect><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 12C20 16.4183 16.412 20 11.986 20C7.78693 20 4.34212 16.7761 4 12.6725H14.5926V11.3275H4C4.34212 7.22393 7.78693 4 11.986 4C16.412 4 20 7.58171 20 12Z" fill="#0052FF"></path></svg>
            </svg>`;
            break;
        case 'bnb':
            svgCode = `<svg id="${chain}" width="24" height="24" style="margin-right: 12px; width: 20px; height: 20px;"><rect rx="6" fill="#F9F9F9" width="24" height="24"></rect><rect rx="6" fill="#0052FF33" width="24" height="24"></rect><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 11.3421L16.2704 9.48437H16.2771L14.6992 8.55553L11.9954 10.1498L9.30786 8.55553L7.73094 9.48437V11.3421L10.4348 12.9286V16.1094L12.005 17.0296L13.5752 16.1094V12.9286L16.279 11.3421ZM11.9963 3.79688L7.72998 6.31226L9.30017 7.24111L11.9963 5.64687L14.7002 7.24111L16.2704 6.31226L11.9963 3.79688ZM6.60375 15.1726L6.5951 11.9995L5.02586 11.0716V16.1101L9.2999 18.6168V16.7591L6.60375 15.1726ZM6.5951 10.6755V8.82644L8.17298 7.8976L6.5951 6.96875L5.0249 7.8976V9.74663L6.5951 10.6755ZM11.9961 6.96875L10.4259 7.8976L11.9961 8.82644L13.5739 7.8976L11.9961 6.96875ZM9.29968 13.5861L7.72949 12.6572V14.5149L9.29968 15.4351V13.5861ZM11.9958 18.3534L10.4256 17.4245V19.2736L11.9958 20.2024L13.5737 19.2736V17.4245L11.9958 18.3534ZM17.3958 6.96875L15.8256 7.8976L17.3958 8.82644V10.6755L18.9737 9.74663V7.8976L17.3958 6.96875ZM18.9747 11.0707L17.4045 11.9995L17.3958 15.1726L14.7006 16.7582V18.6159L18.9747 16.1091V11.0707ZM16.2699 14.5149L14.6997 15.4351V13.5861L16.2699 12.6572V14.5149Z" fill="#EAB200"></path></svg>
            </svg>`;
            break;
        case 'solana':
            svgCode = `<svg id="${chain}" width="24" height="24" style="margin-right: 12px; width: 20px; height: 20px;">
            <rect rx="6" fill="#F9F9F9" width="24" height="24"></rect>
            <rect rx="6" fill="#0052FF33" width="24" height="24"></rect>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 397.7 311.7" x="3" y="3">
                <style type="text/css">
                    .st0{fill:url(#SVGID_1_);}
                    .st1{fill:url(#SVGID_2_);}
                    .st2{fill:url(#SVGID_3_);}
                </style>
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="360.8791" y1="351.4553" x2="141.213" y2="-69.2936" gradientTransform="matrix(1 0 0 -1 0 314)">
                    <stop offset="0" style="stop-color:#00FFA3"/>
                    <stop offset="1" style="stop-color:#DC1FFF"/>
                </linearGradient>
                <path class="st2" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5  c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="264.8291" y1="401.6014" x2="45.163" y2="-19.1475" gradientTransform="matrix(1 0 0 -1 0 314)">
                    <stop offset="0" style="stop-color:#00FFA3"/>
                    <stop offset="1" style="stop-color:#DC1FFF"/>
                </linearGradient>
                <path class="st2" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5  c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="312.5484" y1="376.688" x2="92.8822" y2="-44.061" gradientTransform="matrix(1 0 0 -1 0 314)">
                    <stop offset="0" style="stop-color:#00FFA3"/>
                    <stop offset="1" style="stop-color:#DC1FFF"/>
                </linearGradient>
                <path class="st2" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4  c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
            </svg>
        </svg>`;
            break;
        case 'avalanche':
            svgCode = `<svg id="${chain}" width="24" height="24" style="margin-right: 12px; width: 20px; height: 20px;">
            <rect rx="6" fill="#F9F9F9" width="24" height="24"></rect><rect rx="6" fill="#0052FF33" width="24" height="24"></rect><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2121_13838)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.33367 18.0688H5.8578C5.33754 18.0688 5.08056 18.0688 4.92387 17.9685C4.75462 17.8588 4.6512 17.677 4.63867 17.4764C4.62925 17.2916 4.75776 17.0659 5.01475 16.6146L11.128 5.83913C11.3881 5.38156 11.5197 5.15278 11.6858 5.06816C11.8645 4.97728 12.0776 4.97728 12.2562 5.06816C12.4223 5.15278 12.554 5.38156 12.8141 5.83913L14.0709 8.03295L14.0773 8.04415C14.3582 8.53503 14.5007 8.78396 14.5629 9.04523C14.6318 9.33043 14.6318 9.63129 14.5629 9.9165C14.5002 10.1797 14.3592 10.4305 14.074 10.9288L10.8628 16.6052L10.8545 16.6197C10.5717 17.1146 10.4284 17.3655 10.2298 17.5547C10.0135 17.7616 9.75339 17.912 9.46819 17.9967C9.20807 18.0688 8.91661 18.0688 8.33367 18.0688ZM14.5861 18.0688H18.1337C18.6571 18.0688 18.9204 18.0688 19.0772 17.9655C19.2464 17.8558 19.3529 17.6708 19.3624 17.4703C19.3714 17.2914 19.2457 17.0745 18.9994 16.6494C18.9909 16.635 18.9824 16.6202 18.9738 16.6052L17.1967 13.5652L17.1765 13.531C16.9268 13.1087 16.8007 12.8955 16.6388 12.8131C16.4603 12.7222 16.2502 12.7222 16.0716 12.8131C15.9086 12.8977 15.777 13.1202 15.5169 13.5684L13.7462 16.6084L13.7401 16.6188C13.4809 17.0663 13.3513 17.2899 13.3607 17.4734C13.3732 17.674 13.4766 17.8588 13.6459 17.9685C13.7994 18.0688 14.0627 18.0688 14.5861 18.0688Z" fill="#E84142"></path></g><defs><clipPath id="clip0_2121_13838"><rect width="24" height="24" rx="8" fill="white"></rect></clipPath></defs></svg>
            </svg>`;
            break;
        case 'ton':
            svgCode = `<svg id="${chain}" alt="ton Logo" width="24" height="24" style="margin-right: 12px; width: 24px; height: 24px;">
            <rect rx="6" fill="#F9F9F9" width="24" height="24"></rect><rect rx="6" fill="#0052FF33" width="24" height="24"></rect><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  x="2" y="2" viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve"><script xmlns=""/><style type="text/css">.st0{fill:#0088CC;}.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><circle class="st0" cx="28" cy="28" r="28"/><path class="st1" d="M20.2,18.5h15.7c0.6,0,1.1,0.1,1.7,0.4c0.7,0.3,1.1,0.8,1.3,1.2c0,0,0,0.1,0.1,0.1c0.3,0.5,0.5,1.1,0.5,1.8  c0,0.6-0.1,1.2-0.5,1.8c0,0,0,0,0,0l-9.9,17c-0.2,0.4-0.6,0.6-1.1,0.6c-0.4,0-0.8-0.2-1.1-0.6l-9.7-17c0,0,0,0,0,0  c-0.2-0.4-0.6-0.9-0.6-1.7c-0.1-0.7,0.1-1.3,0.4-1.9c0.3-0.6,0.8-1.1,1.5-1.3C19.1,18.5,19.8,18.5,20.2,18.5z M26.8,20.9h-6.6  c-0.4,0-0.6,0-0.7,0.1c-0.2,0.1-0.3,0.2-0.4,0.4C19,21.5,19,21.7,19,21.9c0,0.1,0.1,0.2,0.3,0.6c0,0,0,0,0,0l7.5,13V20.9z   M29.2,20.9v14.7l7.6-13.1c0.1-0.2,0.1-0.4,0.1-0.6c0-0.2,0-0.4-0.1-0.5c-0.1-0.1-0.1-0.2-0.2-0.2c0,0-0.1-0.1-0.1-0.1  c-0.2-0.1-0.4-0.1-0.7-0.1H29.2z"/><script xmlns=""/></svg>
        </svg>`;
        case 'tron':
            svgCode =   `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  x="2" y="2" viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve"><script xmlns=""/>
            <style type="text/css">
                .st0{fill:#ff0411;}
                .st1{transform: scale(0.6);transform-origin: center; fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
            </style>
            <circle class="st0" cx="28" cy="28" r="28"/>
            <path class="st1"  d="M61.55,19.28c-3-2.77-7.15-7-10.53-10l-.2-.14a3.82,3.82,0,0,0-1.11-.62l0,0C41.56,7,3.63-.09,2.89,0a1.4,1.4,0,0,0-.58.22L2.12.37a2.23,2.23,0,0,0-.52.84l-.05.13v.71l0,.11C5.82,14.05,22.68,53,26,62.14c.2.62.58,1.8,1.29,1.86h.16c.38,0,2-2.14,2-2.14S58.41,26.74,61.34,23a9.46,9.46,0,0,0,1-1.48A2.41,2.41,0,0,0,61.55,19.28ZM36.88,23.37,49.24,13.12l7.25,6.68Zm-4.8-.67L10.8,5.26l34.43,6.35ZM34,27.27l21.78-3.51-24.9,30ZM7.91,7,30.3,26,27.06,53.78Z"/>
            <script xmlns=""/></svg>`;
            break;
        // Weitere Fälle für andere Blockchains
        default:
            // Standard-SVG-Code, wenn keine spezifische Blockchain übereinstimmt
            svgCode = `<svg width="36" height="36" id="$(chain)">
            <rect rx="6" fill="#F9F9F9" width="30" height="30"></rect><rect rx="6" fill="#6B8AFF33" width="30" height="30"></rect><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4817 4.29043L7.08715 11.516C6.91315 11.8019 7.00806 12.1725 7.29743 12.3421L11.692 14.9163C11.8818 15.0279 12.1182 15.0279 12.308 14.9163L16.7026 12.3421C16.9919 12.1725 17.0869 11.8019 16.9129 11.516L12.5192 4.29043C12.2838 3.90319 11.7171 3.90319 11.4817 4.29043Z" fill="#6B8AFF"></path><path d="M15.7897 15.0102C15.7897 14.999 15.7878 14.9888 15.7869 14.9786C15.785 14.9684 15.7831 14.9582 15.7813 14.948C15.7785 14.9359 15.7748 14.9248 15.7711 14.9127C15.7683 14.9035 15.7655 14.8951 15.7608 14.8868C15.7552 14.8738 15.7478 14.8608 15.7404 14.8487C15.7366 14.8422 15.7329 14.8348 15.7283 14.8283C15.7153 14.8098 15.7013 14.7912 15.6846 14.7754C15.6678 14.7597 15.6502 14.7448 15.6316 14.7318C15.625 14.7272 15.6185 14.7244 15.6111 14.7198C15.599 14.7123 15.586 14.7049 15.573 14.6993C15.5646 14.6956 15.5553 14.6928 15.546 14.6891C15.5348 14.6854 15.5228 14.6817 15.5107 14.6789C15.5004 14.6761 15.4902 14.6743 15.48 14.6734C15.4697 14.6715 15.4595 14.6706 15.4484 14.6706C15.4363 14.6706 15.4251 14.6697 15.413 14.6706C15.4046 14.6706 15.3963 14.6724 15.387 14.6734C15.374 14.6752 15.3609 14.6761 15.3479 14.6789C15.3442 14.6789 15.3405 14.6817 15.3368 14.6826C15.2968 14.6928 15.2586 14.7086 15.2233 14.7318L12.3311 16.4363C12.1265 16.5569 11.8735 16.5569 11.6689 16.4363L8.77673 14.7318C8.74139 14.7086 8.70326 14.6928 8.66327 14.6826C8.65955 14.6817 8.65583 14.6799 8.65211 14.6789C8.63909 14.6761 8.62607 14.6752 8.61305 14.6734C8.60468 14.6724 8.59631 14.6715 8.58701 14.6706C8.57492 14.6706 8.56376 14.6706 8.55167 14.6706C8.54144 14.6706 8.53029 14.6724 8.52006 14.6734C8.50983 14.6752 8.4996 14.6771 8.48937 14.6789C8.47728 14.6817 8.46612 14.6854 8.45403 14.6891C8.44473 14.6919 8.43636 14.6956 8.42706 14.6993C8.41404 14.7049 8.40102 14.7123 8.38893 14.7198C8.38242 14.7235 8.37498 14.7272 8.36847 14.7318C8.34987 14.7448 8.33127 14.7587 8.31546 14.7754C8.29965 14.7921 8.28477 14.8098 8.27175 14.8283C8.2671 14.8348 8.26431 14.8413 8.25966 14.8487C8.25222 14.8617 8.24478 14.8738 8.2392 14.8868C8.23548 14.8951 8.23269 14.9044 8.22897 14.9127C8.22525 14.9248 8.22153 14.9359 8.21874 14.948C8.21595 14.9582 8.21409 14.9684 8.21316 14.9786C8.2113 14.9888 8.21037 15 8.21037 15.0102C8.21037 15.0213 8.20944 15.0334 8.21037 15.0445C8.21037 15.0538 8.21223 15.0621 8.21316 15.0714C8.21502 15.0844 8.21595 15.0974 8.21874 15.1095C8.21967 15.115 8.22153 15.1197 8.22339 15.1243C8.23455 15.167 8.25315 15.2069 8.28012 15.244L11.4681 19.7265C11.7275 20.0911 12.2706 20.0911 12.5301 19.7265L15.718 15.244C15.745 15.2069 15.7636 15.167 15.7748 15.1243C15.7757 15.1197 15.7785 15.1141 15.7794 15.1095C15.7822 15.0965 15.7831 15.0844 15.785 15.0714C15.7859 15.0621 15.7869 15.0538 15.7878 15.0445C15.7878 15.0334 15.7878 15.0213 15.7878 15.0102H15.7897Z" fill="#6B8AFF"></path></svg>
            </svg>`;
            break;
    }

    selectedChainBtn.innerHTML = `
        <div class="btnlogo btnsize">
        ${svgCode}
        </div>
        <span class="arrow"><i class="fas fa-chevron-down"></i></span>
    `;

    // Alle Checkmarks ausblenden
    const checkmarks = document.getElementsByClassName("checkmark");
    Array.from(checkmarks).forEach(checkmark => {
        checkmark.style.display = "none";
    });

    // Den Checkmark für die ausgewählte Option anzeigen
    const checkmark = element.querySelector(".checkmark");
    if (checkmark) {
        checkmark.style.display = "inline";
    }
}

// Function to set the default chain to "base"
function setDefaultChain() {
    const baseView = document.getElementById("baseView");
    if (baseView) {
        baseView.style.display = "block";
    } else {
        console.error('Base chain view not found.');
    }

    // Set the default dropdown button content to the base chain SVG
    const selectedChainBtn = document.getElementById("selectedChain");
    if (selectedChainBtn) {
        selectedChainBtn.innerHTML = `
            <div class="btnlogo btnsize">
                <svg id="base" width="24" height="24" style="margin-right: 12px; width: 20px; height: 20px;">
                    <rect rx="6" fill="#F9F9F9" width="24" height="24"></rect>
                    <rect rx="6" fill="#0052FF33" width="24" height="24"></rect>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 12C20 16.4183 16.412 20 11.986 20C7.78693 20 4.34212 16.7761 4 12.6725H14.5926V11.3275H4C4.34212 7.22393 7.78693 4 11.986 4C16.412 4 20 7.58171 20 12Z" fill="#0052FF"></path>
                    </svg>
                </svg>
            </div>
            <span class="arrow"><i class="fas fa-chevron-down"></i></span>
        `;
    } else {
        console.error('Selected chain button not found.');
    }
}
// Initialisierung nach dem Laden des DOM
document.addEventListener('DOMContentLoaded', function() {

   // Check if no chain is selected and set the default chain
   const selectedChainBtn = document.getElementById("selectedChain");
   if (!selectedChainBtn || !selectedChainBtn.querySelector('.btnlogo')) {
       setDefaultChain();
   }

    // GIF-Reloading-Logik
    const gif = document.getElementById('animatedGif');
    if (gif) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio === 1.0) {
                    reloadGif(entry.target);
                }
            });
        }, {threshold: 1.0});
        observer.observe(gif);
    } else {
        console.error('GIF-Element nicht gefunden.');
    }

    // Kopieren-Funktion
   
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => button.addEventListener('click', copyVisibleAddress));
 

// Dropdown-Menü-Interaktion
const dropdownBtn = document.getElementById("selectedChain");
if (dropdownBtn) {
    dropdownBtn.addEventListener("click", function() {
        const dropdownContent = document.getElementById("chainDropdown");
        if (dropdownContent) {
            dropdownContent.classList.toggle("open");
            
            // Pfeil drehen
            const arrowIcon = dropdownBtn.querySelector(".arrow i");
            if (arrowIcon) {
                arrowIcon.classList.toggle("rotate");
                arrowIcon.classList.toggle("reverse-rotate");
            }
        } else {
            console.error('Dropdown-Inhalt nicht gefunden.');
        }
    });

    const chainLinks = document.querySelectorAll("#chainDropdown a");
    chainLinks.forEach(link => {
        link.addEventListener("click", function() {
            const dropdownContent = document.getElementById("chainDropdown");
            if (dropdownContent) {
                dropdownContent.classList.remove("open");
                
                // Pfeil drehen
                const arrowIcon = dropdownBtn.querySelector(".arrow i");
                if (arrowIcon) {
                    arrowIcon.classList.remove("rotate");
                    arrowIcon.classList.add("reverse-rotate");
                }
            } else {
                console.error('Dropdown-Inhalt nicht gefunden.');
            }
        });
    });
} else {
    console.error('Dropdown-Button nicht gefunden.');
}

    
});
