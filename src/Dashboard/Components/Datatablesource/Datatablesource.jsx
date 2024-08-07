const getFileNameFromUrl = (url) => {
  return url.split('/').pop();
};

export const ProductsColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    renderCell: (params) => {
      return <div>{params.row.id}</div>;
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 230,
    renderCell: (params) => {
      return <>{params.row.category.name}</>;
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
    renderCell: (params) => {
      return <>{params.row.description}</>;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 230,
    renderCell: (params) => {
      return <>{"$" + params.row.price}</>;
    },
  },
  {
    field: "Previous price",
    headerName: "Previous Price",
    width: 230,
    renderCell: (params) => {
      return <>{"$" + params.row.disc_price}</>;
    },
  },
  {
    field: "year",
    headerName: "Year",
    width: 230,
    renderCell: (params) => {
      return <>{params.row.year}</>;
    },
  },
  {
    field: "publishers",
    headerName: "Publishers",
    width: 230,
    renderCell: (params) => {
      return <>{params.row.publisher}</>;
    },
  },
  {
    field: "wittenby",
    headerName: "Written By",
    width: 230,
    renderCell: (params) => {
      return <>{params.row.wittenby}</>;
    },
  },
  {
    field: "pdf",
    headerName: "PDF",
    width: 230,
    renderCell: (params) => {
      const fileName = getFileNameFromUrl(params.row.pdf);
      return (
        <>
          {params.row.pdf && params.row.pdf.length >= 1 ? (
            <a href={params.row.pdf} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          ) : (
            ""
          )}
        </>
      );
    },
  },
];
