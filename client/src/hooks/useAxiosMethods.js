import useAxiosPrivate from "./useAxiosPrivate"

const useAxiosMethods = () => {

    const axiosPrivate = useAxiosPrivate()

    const get = (url, setResponse) => {

        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await axiosPrivate.get(url, {
                    signal: controller.signal
                });
                isMounted && setResponse(response.data);
            } catch (err) {
                throw err;
            }
        }

        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const post = (url, data, setResponse) => {
        let isMounted = true;
        const controller = new AbortController();

        const postData = async () => {
            try {
                const response = await axiosPrivate.post(url, data, {
                    signal: controller.signal
                });
                isMounted && setResponse(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        postData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const put = (url, data, setResponse) => {
        let isMounted = true;
        const controller = new AbortController();

        const putData = async () => {
            try {
                const response = await axiosPrivate.put(url, data, {
                    signal: controller.signal
                });
                isMounted && setResponse(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        putData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const del = (url, setResponse) => {
        let isMounted = true;
        const controller = new AbortController();

        const deleteData = async () => {
            try {
                const response = await axiosPrivate.delete(url, {
                    signal: controller.signal
                });
                isMounted && setResponse(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        deleteData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }


    return { get, post, put, del }
}

export default useAxiosMethods
