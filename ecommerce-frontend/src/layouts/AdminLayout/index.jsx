import AdminHeader from './Header';
import AdminSidebar from './Sidebar';
function AdminLayout({ children }) {
    return (
        <div className="flex  h-screen">
            <AdminSidebar></AdminSidebar>
            <div className="flex-1 flex flex-col overflow-hidden ">
                <AdminHeader></AdminHeader>
                <div className="flex-1  ml-64  bg-[#f7f7ff] p-4 mt-19 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
export default AdminLayout;
