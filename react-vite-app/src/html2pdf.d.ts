declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | [number, number] | [number, number, number, number];
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: any;
        jsPDF?: any;
    }

    function html2pdf(): {
        from: (element: HTMLElement) => {
            save: () => void;
        };
        set: (options: Html2PdfOptions) => void;
    };

    export = html2pdf;
}
