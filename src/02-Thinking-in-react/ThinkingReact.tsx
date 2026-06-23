
export default function ThinkingReact() {
    return (
        <div className="border p-5">
            <FilterableProductTable />
        </div>
    )
}

export function FilterableProductTable() {
    return (
        <div >
            <SearchBar />
            <ProductTable />
            <ProductTable />
        </div>
    )
}


export function SearchBar() {
    return (
        <div className='border-2 p-3 border-amber-500'>
            <label htmlFor="textInput">Search : </label>
            <input type="text" id='textInput' placeholder='Search...' />
        </div>
    )
}

export function ProductTable() {
    return (
        <div className='border-2 p-3 border-pink-500'>
            <ProducCategoryRow />
            <ProductRow />
            <ProductRow />
        </div>
    )
}

export function ProducCategoryRow() {
    return (
        <div className='border-2 p-3 border-blue-500'>ProductCategoryRow</div>
    )
}

export function ProductRow() {
    return (
        <div className='border-2 p-3'>ProductRow</div>
    )
}