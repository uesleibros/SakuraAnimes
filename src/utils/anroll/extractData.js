export default function extractData(data) {
	return data
    .split("__NEXT_DATA__")[1]
    .split(`type="application/json">`)[1]
    .split("</script>")[0]
}