import React from 'react';

const Edit = () => {
    return (
        <div className="max-w-4xl flex gap-6 flex-col">
            <div>
                <h5>Tên</h5>
                <input title="Name" className="border mt-2 outline-blue-300 w-full rounded px-4 py-2" />
            </div>
            <div>
                <h5>Tên người dùng</h5>
                <input title="Username" className="border mt-2 outline-blue-300 w-full rounded px-4 py-2" />
            </div>
            <div>
                <h5>Thông tin mô tả</h5>
                <div
                    contentEditable
                    placeholder="Giới thiệu người xem về kênh của bạn. Nội dung mô tả sẽ xuất hiện trong phần Giới thiệu kênh, trong kết quả tìm kiếm và tại các vị trí khác"
                    className="border mt-2 outline-blue-300 overflow-y-auto w-full min-h-[100px] max-h-[680px] rounded px-4 py-2"
                />
            </div>
            <RenderImage
                title="Ảnh"
                desc="Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouTube tại những vị trí như bên cạnh bình luận và
                    video của bạn"
                src=""
            />
            <RenderImage title="Hình ảnh biều ngữ" desc="Hình ảnh này sẽ xuất hiện ở phần đầu kênh của bạn" src="" />
        </div>
    );
};

export default Edit;
const RenderImage = ({ title, desc, src }: { title: string; desc: string; src: string }) => (
    <div>
        <h5>{title}</h5>
        <span className="text-sm">{desc}</span>
        <div className="flex items-center">
            <div className="flex flex-col items-center w-[290px] my-4">
                <img src={src ? src : '/unnamed.png'} alt="Avatar" className="w-36 h-36 rounded-full" />
            </div>
            <div className="flex-1 max-w-[350px]">
                <span className="text-xs">
                    Bạn nên dùng ảnh có độ phân giải tối thiểu 98 x 98 pixel và có kích thước tối đa 4 MB. Hãy dùng tệp
                    PNG hoặc GIF (không dùng ảnh động). Nhớ đảm bảo hình ảnh của bạn tuân thủ Nguyên tắc cộng đồng của
                    YouTube
                </span>
                <div className="flex gap-4 text-blue-500 font-semibold mt-4">
                    <button>Thay đổi</button>
                    <button>Xóa</button>
                </div>
            </div>
        </div>
    </div>
);
