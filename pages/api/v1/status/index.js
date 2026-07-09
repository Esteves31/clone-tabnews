function status(request, response) {
    response.status(200).json({ message: "Ta funcionando chefe", status: 200 });
}

export default status;
