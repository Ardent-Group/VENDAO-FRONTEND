// hexadecimals to number
export const hexToDecimal = (hex:any) => parseInt(hex,16);

export const makeUrl = (ipfsURI:string) => {
    return ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
}


export const getStatusColor = (status: any) => {
    switch (status) {
        case 0:
            return "#D9FFD6";
        case 1:
            return "#FEFFD6";
        case 2:
            return "#FFD6D6";
        default:
            return "gray";
    }
}

export const getStatusColorText = (status: any) => {
    switch (status) {
      case 0:
        return "#4CDC3F";
      case 1:
        return "#D1D600";
      case 2:
        return "#F42C2C";
      default:
        return "black";
    }
};

export const getStatusLabel = (status: any) => {
    switch (status) {
      case 0:
        return "Approved";
      case 1:
        return "Pending";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
    }
};