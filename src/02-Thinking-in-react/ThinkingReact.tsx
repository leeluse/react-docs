
export default function ThinkingReact() {
    return (
        <div>
            <FilterableProductTable />
        </div>
    )
}

export function FilterableProductTable() {
    return (
        <div className='FilterableProductTable'>
            <SearchBar />
            <ProductTable />
            <ProductTable />
        </div>
    )
}


export function SearchBar() {
    return (
        <div className='SearchBar'>
            <label htmlFor="textInput">Search : </label>
            <input type="text" id='textInput' placeholder='Search...' />
        </div>
    )
}

export function ProductTable() {
    return (
        <div className='ProductTable'>
            <ProducCategoryRow />
            <ProductRow />
            <ProductRow />
        </div>
    )
}

export function ProducCategoryRow() {
    return (
        <div className='ProducCategoryRow'>ProductCategoryRow</div>
    )
}

export function ProductRow() {
    return (
        <div className='ProductRow'>ProductRow</div>
    )
}