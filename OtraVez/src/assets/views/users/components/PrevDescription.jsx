const PrevDescription = ({ descriptions }) => {
    console.log(descriptions);
    return (
      <div>
        <div
          style={{
            width: "750px",
            height: "304px",
            borderRadius: "20px",
            borderColor: "#ccc", 
            borderWidth: "1px", 
            borderStyle: "solid", 
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {descriptions?.map((des, idx) => (
            <p key={idx}> {des.description + "\n"} </p>
          ))}
        </div>
      </div>
    );
  };
  
  export default PrevDescription;
  