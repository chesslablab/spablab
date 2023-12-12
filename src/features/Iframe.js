const Iframe = ({ title, src }) => {

    if (title && src) {
        return (
            <iframe title={title} src={src}></iframe>
        );
    }

    return null;
};

export default Iframe;