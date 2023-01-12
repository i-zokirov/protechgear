import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    };
    return (
        <Form
            inline="true"
            onSubmit={submitHandler}
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "5px",
            }}
        >
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products ..."
                className="mr-sm-2 ml-sm-5"
                style={{ width: "75%" }}
            ></Form.Control>

            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
